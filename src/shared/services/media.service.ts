import axios from "@src/core/axios";

export const MediaService = () => {
  return {
    uploadFile: async (formData: FormData) => {
      const response = await axios.post("/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return {
        success: response.status === 201,
        message: "File Uploaded",
        data: response.data,
      };
    },
  };
};
