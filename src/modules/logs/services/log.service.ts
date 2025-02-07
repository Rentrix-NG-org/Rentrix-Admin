import axios from "@src/core/axios";

export const LogService = () => {
  return {
    getAllLogs: async (query?: string) => {
      try {
        const response = await axios.get(`/admin/logs?${query}`);

        return {
          success: response.status === 200,
          message: "Fetched",
          data: response.data,
        };
      } catch (error) {
        return {
          success: false,
          message: String(error) || "Failed to fetch logs",
          data: null,
        };
      }
    },
  };
};
