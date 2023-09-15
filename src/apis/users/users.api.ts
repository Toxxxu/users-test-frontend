import axios, { AxiosInstance } from "axios";

export const usersApi: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/users',
  headers: {
    'Content-type': 'application/json',
  },
})