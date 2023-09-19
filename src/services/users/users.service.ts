import { usersApi } from "../../apis/users/users.api";
import { CreateUserRequestDto } from "../../dto/signup/create-user-request.dto";
import { DoTestRequestDto } from "../../dto/tests/requests/do-test-request.dto";
import { GetUserTestResultDto } from "../../dto/tests/responses/completed/get-user-test-result.dto";
import { User } from "../../models/User.model";

export const usersService = {
  async createUser(createUserRequest: CreateUserRequestDto) {
    try {
      const response = await usersApi.post<User>('/', createUserRequest);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create user.');
    }
  },

  async getProfile(token: string): Promise<User> {
    try {
      const response = await usersApi.get<User>('/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user profile.');
    }
  },

  async doTestById(testId: string, doTestRequest: DoTestRequestDto, token: string): Promise<GetUserTestResultDto> {
    try {
      const response = await usersApi.post<GetUserTestResultDto>(
        `/do/${testId}`,
        doTestRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to pass the test.');
    }
  },

  async getTestResult(testId: string, token: string): Promise<GetUserTestResultDto> {
    try {
      const response = await usersApi.get<GetUserTestResultDto>(`/getTestResult/${testId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch test result.');
    }
  },
}
