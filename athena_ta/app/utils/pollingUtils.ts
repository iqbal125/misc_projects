import { API_HOST } from "../constants";
import { sleep } from "./timeUtils";

// Gets the data from a background job by polling until it's complete
export const pollForJobData = async (
  jobId: number,
  progressCallback: (data: any) => void = () => {}
): Promise<any> => {
  const WAIT_TIME_BETWEEN_REQUESTS = 1000;

  while (true) {
    const response = await fetch(
      `${API_HOST}/api/v3/background_job_data/${jobId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch job data");
    }

    const jobData = await response.json();

    const jobDataAttributes = jobData.data.attributes;

    progressCallback(jobDataAttributes.data);
    if (jobDataAttributes.state === "completed") {
      return jobDataAttributes.data;
    } else if (jobDataAttributes.state === "failed") {
      throw new Error("Job failed");
    }

    await sleep(WAIT_TIME_BETWEEN_REQUESTS);
  }
};
