import {
  getJobPostingById,
  type JobPosting as JobDetailData,
} from "@/services/api";

export {
  getAllJobPostings,
  createJobPosting,
  updateJobPosting,
  deleteJobPosting,
  getJobPostingById,
  type JobPosting,
  type CreateJobPostingData,
} from "@/services/api";

export type { JobDetailData };

export async function fetchJobDetail(id: string): Promise<JobDetailData> {
  return getJobPostingById(Number(id));
}
