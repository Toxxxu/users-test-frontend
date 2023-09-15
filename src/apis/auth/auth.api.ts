import axios, { AxiosInstance } from "axios";

export const authApi: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/auth',
  headers: {
    'Content-type': 'application/json',
  },
})