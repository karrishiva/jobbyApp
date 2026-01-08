"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import {
  ProfileDetails,
  JobResponse,
  JobFilterSearchParams,
} from "@/app/types/userDetails";

export default function JobsPage() {
  const [profileData, setProfileData] = useState<ProfileDetails | null>(null);
  const [jobData, setJobData] = useState<JobResponse>({
    jobs: [],
    total: 0,
  });
  const [filteredJobs, setFilteredJobs] = useState<JobFilterSearchParams>({
    employment_type: "",
    minimum_package: "",
    search: "",
  });

  const [loading, setLoading] = useState(false);

  /* -------------------- PROFILE API -------------------- */
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const res = await axios.get("/api/profile");
        setProfileData(res.data);
      } catch (error) {
        console.error("Profile error:", error);
      }
    };
    getProfileData();
  }, []);

  /* -------------------- JOB API (DEBOUNCED) -------------------- */
  useEffect(() => {
    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const salary = filteredJobs.minimum_package
          ? Number(filteredJobs.minimum_package) * 100000
          : "";

        const res = await axios.get(
          `/api/jobs?employment_type=${filteredJobs.employment_type}&minimum_package=${salary}&search=${filteredJobs.search}`
        );

        setJobData(res.data);
      } catch (error) {
        console.error("Jobs error:", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [filteredJobs]);

  /* -------------------- HANDLERS -------------------- */
  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFilteredJobs((prev) => ({
      ...prev,
      employment_type: checked
        ? prev?.employment_type
          ? `${prev.employment_type},${value}`
          : value
        : prev?.employment_type
        ? prev.employment_type
            .split(",")
            .filter((type) => type !== value)
            .join(",")
        : "",
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredJobs((prev) => ({
      ...prev,
      minimum_package: e.target.value,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredJobs((prev) => ({
      ...prev,
      search: e.target.value,
    }));
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex gap-8 px-10 py-8 sticky top-5 h-[90vh]">

        {/* -------------------- SIDEBAR -------------------- */}
        <aside className="w-full sticky top-24 flex flex-col justify-between">
          <div className="bg-indigo-100 text-black rounded-xl p-5">
            <div className="flex items-center gap-4">
              <Image
                src={
                  profileData?.profile_details?.profile_image_url ||
                  "/default-profile.png"
                }
                alt="profile"
                width={56}
                height={56}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold text-indigo-600">
                  {profileData?.profile_details?.name || "Guest User"}
                </h3>
                <p className="text-sm text-gray-700">
                  {profileData?.profile_details?.short_bio ||
                    "No bio available"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Type of Employment</h4>
            <div className="space-y-2 text-sm text-gray-300">
              {["Full Time", "Part Time", "Freelance", "Internship"].map(
                (type) => (
                  <label key={type} className="flex gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      onChange={handleCheckBox}
                      checked={filteredJobs.employment_type
                        ?.split(",")
                        .includes(type)}
                      value={type}
                      className="accent-indigo-500"
                    />
                    {type}
                  </label>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Salary Range</h4>
            <div className="space-y-2 text-sm text-gray-300">
              {["10", "20", "30", "40"].map((salary) => (
                <label key={salary} className="flex gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="salary"
                    value={salary}
                    checked={filteredJobs.minimum_package === salary}
                    onChange={handleRadioChange}
                    className="accent-indigo-500"
                  />
                  {salary} LPA and above
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* -------------------- JOB LIST -------------------- */}
        <main className="w-3/4 space-y-6 overflow-y-auto max-h-[calc(100vh-6rem)]">
          {/* Search */}
          <div className="flex items-center bg-zinc-900 rounded-lg px-4 py-2 w-full md:w-1/2">
            <input
              placeholder="Search jobs"
              value={filteredJobs.search}
              onChange={handleSearchChange}
              className="bg-transparent outline-none flex-1 text-sm"
            />
            🔍
          </div>

          {/* States */}
          {loading && <p className="text-gray-400">Loading jobs...</p>}

          {!loading && jobData.jobs.length === 0 && (
            <p className="text-gray-400">No jobs found</p>
          )}

          {/* Job Cards */}
          {!loading &&
            jobData.jobs.map((job) => <JobCard key={job.id} job={job} />)}
        </main>
      </div>
    </div>
  );
}

/* -------------------- JOB CARD -------------------- */
function JobCard({ job }: any) {
  return (
    <div className="bg-zinc-900 rounded-xl p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <Image
            src={job.company_logo_url}
            alt={job.title}
            width={48}
            height={48}
            className="rounded"
          />
          <div>
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm text-yellow-400">⭐ {job.rating}</p>
          </div>
        </div>
        <span className="font-semibold">{job.package_per_annum}</span>
      </div>

      <div className="flex gap-6 text-sm text-gray-400">
        <span>📍 {job.location}</span>
        <span>💼 {job.employment_type}</span>
      </div>

      <hr className="border-zinc-700" />

      <div>
        <h4 className="font-semibold mb-1">Description</h4>
        <p className="text-sm text-gray-300">{job.job_description}</p>
      </div>
    </div>
  );
}
