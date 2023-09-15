import { usersApi } from "../../apis/users/users.api";
import { CreateUserRequestDto } from "../../dto/signup/create-user-request.dto";
import { User } from "../../models/User.model";

export const usersService = {
  async createUser(createUserRequest: CreateUserRequestDto) {
    try {
      const response = await usersApi.post('/', createUserRequest);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create user.');
    }
  },

  async getProfile() {
    try {
      const response = await usersApi.get<User>('profile');
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user profile.');
    }
  },

  async doTestById(testId: string, doTestRequest: any) {
    try {
      const response = await usersApi.post(`do/${testId}`, doTestRequest);
      return response.data;
    } catch (error) {
      throw new Error('Failed to pass the test.');
    }
  },

  async getTestResult(testId: string) {
    try {
      const response = await usersApi.get(`getTestResult/${testId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch test result.');
    }
  }
}