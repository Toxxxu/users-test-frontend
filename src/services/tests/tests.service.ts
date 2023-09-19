import { testsApi } from "../../apis/tests/tests.api"
import { CreateTestRequestDto } from "../../dto/tests/requests/create/create-test-request.dto";
import { Test } from "../../models/Test.model"

export const testsService = {
  async findAllTests(): Promise<Test[]> {
    try {
      const response = await testsApi.get<Test[]>('/');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch tests');
    }
  },

  async findAssignedTests(token: string): Promise<Test[]> {
    try {
      const response = await testsApi.get<Test[]>('/assignedtests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch assigned tests');
    }
  },

  async findCompletedTests(token: string): Promise<Test[]> {
    try {
      const response = await testsApi.get<Test[]>('/completedtests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch completed tests');
    }
  },

  async findTest(testId: string, token: string): Promise<Test> {
    try {
      const response = await testsApi.get<Test>(`${testId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch test by ID');
    }
  },

  async createTest(createTestRequest: CreateTestRequestDto): Promise<Test> {
    try {
      const response = await testsApi.post<Test>('/', createTestRequest);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create test');
    }
  }
}
