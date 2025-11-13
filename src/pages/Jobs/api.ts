import {
  type JobPosting,
  type JobPosting as JobDetailData,
  getAllJobPostings,
  createJobPosting,
  updateJobPosting,
  deleteJobPosting,
  getJobPostingById,
  type CreateJobPostingData,
} from "@/services/jobs";

export {
  getAllJobPostings,
  createJobPosting,
  updateJobPosting,
  deleteJobPosting,
  getJobPostingById,
  type CreateJobPostingData,
};

export type { JobDetailData };

export type JobListItem = JobPosting;

export async function fetchJobDetail(id: string): Promise<JobDetailData> {
  return getJobPostingById(Number(id));
}
