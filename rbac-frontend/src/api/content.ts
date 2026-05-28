import axiosInstance from "./axiosInstance";
import type { MessageResponse } from "../types";

export const getPublicContent = async (): Promise<MessageResponse> => {
  const response = await axiosInstance.get<MessageResponse>("/api/public");
  return response.data;
};

export const getUserContent = async (): Promise<MessageResponse> => {
  const response = await axiosInstance.get<MessageResponse>("/api/user");
  return response.data;
};

export const getAdminContent = async (): Promise<MessageResponse> => {
  const response = await axiosInstance.get<MessageResponse>("/api/admin");
  return response.data;
};
