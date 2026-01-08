"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="bg-slate-950 max-h-screen text-white">
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-16 lg:py-24">
        <div className="lg:w-1/2">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Find The Job That Fits Your Life
          </h1>
          <p className="text-gray-300 mb-6 lg:mb-10 text-lg">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <button
            onClick={() => router.push("/jobs")}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-md text-lg font-semibold transition"
          >
            Find Jobs
          </button>
        </div>

        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <Image
            src="https://assets.ccbp.in/frontend/react-js/home-lg-bg.png"
            alt="Job illustration"
            width={500}
            height={300}
            className="max-w-full h-auto"
          />
        </div>
      </section>
    </div>
  );
}
