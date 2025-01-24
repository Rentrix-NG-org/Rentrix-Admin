import axios from "@src/core/axios";

export const UserService = () => {
  return {
    getAllUsers: async () => {
      const response = await axios.get("/admin/users");

      return {
        success: response.status === 200,
        message: "Fetched",
        data: response.data,
      };
    },
  };
};
