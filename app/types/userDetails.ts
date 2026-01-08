export interface LoginDetails {
    username: string;
    password: string;
}

interface Profile {
    name: string;
    profile_image_url: string;
    short_bio: string;
}

export interface ProfileDetails {
    profile_details: Profile;
}

interface JobDetails {
    id: string;
    title: string;
    company_logo_url: string;
    employment_type: string;
    job_description: string;
    location: string;
    package_per_annum: string;
    rating: number;
}

export interface JobResponse {
    jobs: JobDetails[];
    total: number;
}

export interface JobFilterSearchParams {
    employment_type?: string;
    minimum_package?: string;
    search?: string;
}

