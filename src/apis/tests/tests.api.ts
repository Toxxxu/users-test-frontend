import axios, { AxiosInstance } from "axios";

export const testsApi: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/tests',
  headers: {
    'Content-type': 'application/json',
  },
})