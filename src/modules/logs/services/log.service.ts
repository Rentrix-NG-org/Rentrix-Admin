import axios from "@src/core/axios";
import { AxiosResponse } from "axios";
import { PasswordResetStatus } from "../types/log.types";

export const LogService = () => {
  return {
    getAllLoginLogs: async (query: { page: number, limit: number }, isFailed?: boolean) => {
      try {
        let response: AxiosResponse<any, any>
        
        if(isFailed){
          response = await axios.get(`/admin/logs/failed/logins`, {
            params: query
          });
        }else {
          response = await axios.get(`/admin/logs/login/logs`, {
            params: query
          });
        }

        return {
          success: true,
          message: "Fetched",
          data: response.data.data,
          pagination: {
            page: Number(response.data.page),
            totalPages: Number(response.data.totalPages)
          }
        };
      } catch (error) {
        console.log('errorhiggfaugifuhiuhifr', error)
        return {
          success: false,
          message: String(error) || "Failed to fetch logs",
          data: null,
        };
      }
    },
    getPasswordRequestsLogs: async (query?: { page?: number, limit?: number, status: PasswordResetStatus }) => {
      try {
        const response = await axios.get(`/admin/password-reset-logs`, {
          params: query
        });
        return {
          success: true,
          message: "Fetched",
          data: response.data.data,
          pagination: {
            page: Number(response.data.page),
            totalPages: Number(response.data.totalPages)
          }
        };
      } catch (error) {
        return {
          success: false,
          message: String(error) || "Failed to fetch password requests",
          data: null,
        };
      }
    },
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

    getAdmin: async (userId: string) => {
      try {
        const response = await axios.get(`/admin/logs/${userId}/admin`);
        return {
          success: response.status === 200,
          message: "Fetched",
          data: response.data,
        };
      } catch (error) {
        return {
          success: false,
          message: String(error) || "Failed to fetch admin log",
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
