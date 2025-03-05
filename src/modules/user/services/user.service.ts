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

    getUserRep: async (userId: string) => {
      if (!userId) {
        return {
          success: false,
          message: "UserId missing",
          data: null,
        };
      }
      const response = await axios.get(`/admin/users/${userId}/rep`);

      return {
        success: response.status === 200,
        message: "Fetched",
        data: response.data,
      };
    },

    getUserAdmin: async (adminId: string | undefined) => {
      if (!adminId) {
        return {
          success: false,
          message: "AdminId missing",
          data: null,
        };
      }
      const response = await axios.get(`/admin/details/${adminId}`);

      return {
        success: response.status === 200,
        message: "Fetched",
        data: response.data,
      };
    },

    addUser: async (data: any) => {
      const response = await axios.post(`/admin/user`, data);
      return {
        success: response.status === 201,
        message: "User added",
        data: response.data,
      };
    },
    updateUser: async (id: string, data: any) => {
      const response = await axios.patch(`/admin/users/${id}`, data);
      return {
        success: response.status === 200,
        message: "Updated",
        data: response.data,
      };
    },

    changeRoles: async (id: string, role: "representative" | "supervisor") => {
      const response = await axios.patch(`/admin/users/${id}/role`, role);
      return {
        success: response.status === 200,
        message: "Role updated",
        data: response.data,
      };
    },

    upgradeToRep: async (email: string, location: string) => {
      if (!email) {
        return {
          success: false,
          message: "Email missing",
          data: null,
        };
      }
      const response = await axios.patch(`/admin/rep-upgrade`, {
        email,
        location,
      });

      return {
        success: response.status === 200,
        message: "Upgraded to representative",
        data: response.data,
      };
    },

    getLocations: async () => {
      const response = await axios.get("/admin/locations");

      return {
        success: response.status === 200,
        message: "Locations fetched",
        data: response.data,
      };
    },

    updateLocations: async (userId: string, location: string) => {
      if (!userId) {
        return {
          success: false,
          message: "UserId missing",
          data: null,
        };
      }
      const response = await axios.patch(`/admin/user/${userId}/location`, {
        location,
      });

      return {
        success: response.status === 200,
        message: "Location updated",
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

    getAllLogs: async (userId: string) => {
      if (!userId) {
        return {
          success: false,
          message: "UserId missing",
          data: null,
        };
      }
      const response = await axios.get(`/admin/users/${userId}/logs`);

      return {
        success: response.status === 200,
        message: "Fetched",
        data: response.data,
      };
    },

    getAllPermissions: async (userId: string) => {
      if (!userId) {
        return {
          success: false,
          message: "UserId missing",
          data: null,
        };
      }
      try {
        const response = await axios.get(`/admin/${userId}/permissions`);

        return {
          success: response.status === 200,
          message: "Fetched",
          data: response.data,
        };
      } catch (error) {
        console.error("Error fetching permissions:", error);
        return {
          success: false,
          message: "Failed to fetch permissions",
          data: null,
        };
      }
    },

    getOwnedPermissions: async () => {
      try {
        const response = await axios.get(`/admin/own-permissions`);
        return {
          success: response.status === 200,
          message: "Fetched",
          data: response.data,
        };
      } catch (error) {
        console.error("Error fetching own permissions:", error);
        return {
          success: false,
          message: "Failed to fetch permissions",
          data: null,
        };
      }
    },

    grantAccess: async (
      userId: string,
      permissions: { name: string; checked: boolean }[],
    ) => {
      if (!userId) {
        return {
          success: false,
          message: "UserId missing",
          data: null,
        };
      }
      const response = await axios.patch(
        `/admin/${userId}/grantAccess`,
        permissions,
      );

      return {
        success: response.status === 200,
        message: "Access granted",
        data: response.data,
      };
    },

    denyAccess: async (userId: string) => {
      if (!userId) {
        return {
          success: false,
          message: "UserId missing",
          data: null,
        };
      }
      const response = await axios.patch(`/admin/users/${userId}/denyAccess`);

      return {
        success: response.status === 200,
        message: "Access denied",
        data: response.data,
      };
    },

    handlePasswordRequest: async (request: {
      userId: string;
      approved: boolean;
    }) => {
      const response = await axios.patch(`/admin/password-request`, request);

      return {
        success: response.status === 200,
        message: "Password reset requested",
        data: response.data,
      };
    },
  };
};
