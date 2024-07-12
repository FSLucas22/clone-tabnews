import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();
  async function waitForWebServer() {
    const retries = 100;
    const endpoint = "api/v1/status";
    return retry(fetchStatusPage, {
      retries,
      maxTimeout: 1000,
      onRetry: (error, attempt) => {
        if (attempt % 5 == 0) {
          console.log(
            `Attempt ${attempt}/${retries} - Failed to fetch ${endpoint} endpoint: ${error.message}`,
          );
        }
      },
    });

    async function fetchStatusPage() {
      const response = await fetch(`http://localhost:3000/${endpoint}`);
      if (response.status !== 200) {
        throw Error(`Endpoint returned with status code ${response.status}`);
      }
    }
  }
}

const orchestrator = {
  waitForAllServices,
};

export default orchestrator;
