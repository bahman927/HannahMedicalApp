import api from "./api"; // Import the axios instance

const fetchWithTokenRefresh = async (requestFunc) => {
  try {
    // ✅ Try executing the original API request
    return await requestFunc();
  } catch (error) {
    // ✅ Check if the error is due to token expiration (403)
    if (error.response && error.response.status === 403) {
      try {
        console.log("Access token expired, attempting to refresh...");

        // ✅ Request a new token from the refresh endpoint
        await api.get("/auth/refresh", { withCredentials: true });

        // ✅ Retry the original request
        return await requestFunc();
      } catch (refreshError) {
        console.error("Session expired, please log in again.");
        throw refreshError;
      }
    }
    throw error;
  }
};

export default fetchWithTokenRefresh;
