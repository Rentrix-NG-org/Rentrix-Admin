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
    getLog: async (id: string) => {
      try {
        const response = await axios.get(`/admin/logs/${id}`);

        return {
          success: response.status === 200,
          message: "Fetched",
          data: response.data,
        };
      } catch (error) {
        return {
          success: false,
          message: String(error) || "Failed to fetch log",
          data: null,
        };
      }
    },

    deleteLog: async (id: string) => {
      try {
        const response = await axios.delete(`/admin/logs/${id}`);

        return {
          success: response.status === 200,
          message: "Log deleted successfully",
          data: response.data,
        };
      } catch (error) {
        return {
          success: false,
          message: String(error) || "Failed to delete log",
          data: null,
        };
      }
    },
  };
};
