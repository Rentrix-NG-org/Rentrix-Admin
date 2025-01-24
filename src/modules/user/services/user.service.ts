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
    updateUser: async (id: string, data: any) => {
      const response = await axios.patch(`/admin/user/${id}`, data);
      return {
        success: response.status === 200,
        message: "Updated",
        data: response.data,
      };
    },
  };
};
