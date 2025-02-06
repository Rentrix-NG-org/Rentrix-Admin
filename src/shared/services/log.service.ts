import axios from "@src/core/axios";

export const LogService = () => {
  return {
    getLogs: async (userId: string) => {
      const response = await axios.get(`/logs/${userId}`);

      return {
        success: response.status === 200,
        message: "Logs fetched",
        data: response.data,
      };
    },
  };
};
