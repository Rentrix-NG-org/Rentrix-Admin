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

    getTypeUsers: async (url: string) => {
      try {
        const response = await axios.get(url);
        return {
          success: response.status === 200,
          message: "Fetched",
          data: response.data,
        };
      } catch (e) {
        return {
          success: false,
          message: "failed",
          data: [],
        };
      }
    },

    deleteUserById: async (userId: string) => {
      try {
        const response = await axios.delete(`/admin/users/${userId}`);
        return {
          success: response.status === 200,
          message: "User deleted",
          data: response.data,
        };
      } catch (error) {
        return {
          success: false,
          message: "Failed to delete user",
          data: null,
        };
      }
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

      // console.log('data', response)

      return {
        success: response.status === 200,
        message: "Fetched",
        data: response.data,
      };
    },
    deleteUser: async (userId: string) => {
      if (!userId) {
        return {
          success: false,
          message: "UserId missing",
          data: null,
        };
      }
      const response = await axios.delete(`/admin/users/${userId}`);

      return {
        success: response.status === 200,
        message: "User deleted",
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

    changeRepresentative: async (repId: string, listingId: string) => {
      if (!repId || !listingId) {
        return {
          success: false,
          message: "Rentrix Rep ID or Listing ID missing",
          data: null,
        };
      }
      const response = await axios.patch(`/admin/change-rep`, {
        repId,
        listingId,
      });

      return {
        success: response.status === 200,
        message: "Representative changed successfully",
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
    updateidentityStatus: async (userId: string, status: string) => {
      const response = await axios.patch(
        `/admin/users/${userId}/identity/${status}`
      );
      return {
        success: response.status === 200,
        message: "Success",
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

    upgradeToRep: async (data: {
      email: string;
      lgaIds: string[];
      maxListingsPerMonth: number;
      commissionRate: number;
      notes: string;
    }) => {
      if (!data.email) {
        return {
          success: false,
          message: "Email missing",
          data: null,
        };
      }
      const response = await axios.patch(`/admin/rep-upgrade`, data);

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

    updateLocations: async (repId: string, lgaIds: string[]) => {
      if (!repId) {
        return {
          success: false,
          message: "UserId missing",
          data: null,
        };
      }
      const response = await axios.post(
        `/admin/rentrix-rep/assign-multiple-lgas`,
        {
          repId,
          lgaIds,
          priority: 1,
          notes: "Primary coverage area",
        }
      );

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
      permissions: { name: string; checked: boolean }[]
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
        permissions
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
      adminId?: string;
    }) => {
      const response = await axios.patch(`/admin/password-request`, request);

      return {
        success: response.status === 200,
        message: "Password reset requested",
        data: response.data,
      };
    },

    getStates: async () => {
      try {
        const response = await axios.get(
          `/location/states?countryName=Nigeria`
        );
        return response;
      } catch (error: any) {
        console.log(error);
        return {
          data: {
            message: error.response?.data?.message,
          },
          status: error.response?.data?.statusCode || 500,
        };
      }
    },
    getCitites: async (stateId: string) => {
      try {
        const response = await axios.get(`/location/cities?stateId=${stateId}`);
        return response;
      } catch (error: any) {
        console.log(error);
        return {
          data: {
            message: error.response?.data?.message,
          },
          status: error.response?.data?.statusCode || 500,
        };
      }
    },
    getLgas: async (cityId: string) => {
      try {
        const response = await axios.get(`/location/lgas?cityId=${cityId}`);
        return response;
      } catch (error: any) {
        console.log(error);
        return {
          data: {
            message: error.response?.data?.message,
          },
          status: error.response?.data?.statusCode || 500,
        };
      }
    },
    getKeyAreas: async (lgaId: string) => {
      try {
        const response = await axios.get(`/location/key-areas?lgaId=${lgaId}`);
        return response;
      } catch (error: any) {
        console.log(error);
        return {
          data: {
            message: error.response?.data?.message,
          },
          status: error.response?.data?.statusCode || 500,
        };
      }
    },
    getAssignedLocations: async (userId: string) => {
      try {
        const response = await axios.get(
          `/admin/users/${userId}/rep-locations`
        );
        return response;
      } catch (error: any) {
        console.log(error);
        return {
          data: {
            message: error.response?.data?.message,
          },
          status: error.response?.data?.statusCode || 500,
        };
      }
    },

    getAllWithdrawalRequest: async (query?: string) => {
      try {
        const response = await axios.get(
          `/withdrawal-requests/admin/all?${query}`
        );

        return {
          success: response.data.success,
          message: "Fetched",
          data: response.data.data,
        };
      } catch (e) {
        return {
          success: e.status === 200,
          message: e.response.data.message,
        };
      }
    },

    getWithdrawalRequestDetails: async (id: string) => {
      const response = await axios.get(`/withdrawal-requests/admin/${id}`);

      return {
        success: response.status === 200,
        message: "Fetched",
        data: response.data.data,
      };
    },

    approveWithdrawalRequest: async (
      id: string,
      data: { adminPin: string; notes?: string }
    ) => {
      try {
        const response = await axios.patch(
          `/withdrawal-requests/admin/${id}/approve`,
          data
        );

        return {
          success: response.data.statusCode === 200,
          message: response.data.message,
          data: response.data.data,
        };
      } catch (e) {
        return {
          success: e.status === 200,
          message: e.response.data.message,
        };
      }
    },

    createPin: async (data: { pin: string; confirmPin: string }) => {
      try {
        const response = await axios.post(`/admin/set-pin`, data);

        return {
          success: response.data.statusCode === 201,
          message: response.data.message,
        };
      } catch (e) {
        return {
          success: e.status === 200,
          message: e.response.data.message,
        };
      }
    },

    changePin: async (data: { currentPin: string; newPin: string }) => {
      try {
        const response = await axios.patch(`/admin/change-forced-pin`, data);

        return {
          success: response.data.success,
          message: response.data.message,
        };
      } catch (e) {
        return {
          success: e.status === 200,
          message: e.response.data.message,
        };
      }
    },

    forcePinReset: async (adminId: string) => {
      const response = await axios.patch(
        `/admin/${adminId}/trigger-pin-change?adminId=${adminId}`
      );

      return {
        success: response.data.success,
        message: response.data.message,
      };
    },

    checkPinStatus: async () => {
      const response = await axios.get(`/admin/check-pin-status`);

      return {
        hasPin:
          response.data.hasPin &&
          response.data.pinStatus === "active" &&
          !response.data.isBlocked &&
          !response.data.forcedPinChange,
        forcedPinChange: response.data.forcedPinChange,
      };
    },
  };
};
