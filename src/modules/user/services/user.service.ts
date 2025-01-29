import axios from "@src/core/axios";

export const UserService = () => {
  return {
    getAllUsers: async (query?: string) => {
      const response = await axios.get(`/admin/users?${query}`);

      return {
        success: response.status === 200,
        message: "Fetched",
        data: response.data,
      };
    },

    getUser: async (userId: string) => {
      if (!userId) {
        return {
          success: false,
          message: "UserId missing",
          data: null,
        };
      }
      const response = await axios.get(`/admin/users/${userId}`);

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

    getUserListings: async (userId: string) => {
      if (!userId) {
        return {
          success: false,
          message: "UserId missing",
          data: null,
        };
      }
      const response = await axios.get(`/admin/users/${userId}/listings`);

      return {
        success: response.status === 200,
        message: "Fetched",
        data: response.data,
      };
    },
    getUserTransactions: async (userId: string) => {
      if (!userId) {
        return {
          success: false,
          message: "UserId missing",
          data: null,
        };
      }
      const response = await axios.get(`/admin/users/${userId}/transactions`);

      return {
        success: response.status === 200,
        message: "Fetched",
        data: response.data,
      };
    },
  };
};
