import { authApi } from "../../apis/auth/auth.api"
import { LoginRequestDto } from "../../dto/login/login-request.dto";
import { User } from "../../models/User.model";

export const authService = {
  async login(loginRequest: LoginRequestDto) {
    try {
      const response = await authApi.post<User>('login', loginRequest);
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      return response.data;
    } catch (error) {
      throw new Error('Login failed. Please check your credentials');
    }
  }
}