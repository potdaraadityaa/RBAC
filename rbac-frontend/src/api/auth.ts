import axiosInstance from "./axiosInstance";
import type { RegisterRequest, LoginRequest, AuthResponse, MessageResponse } from "../types";

export const registerUser = async (data: RegisterRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>("/api/auth/register", data);
  return response.data;
};

export const loginUser = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/api/auth/login", data);
  return response.data;
};
