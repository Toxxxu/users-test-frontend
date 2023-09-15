export interface User {
  _id: string;
  username: string;
  access_token: string;
  assignedTests: string[];
  completedTests: string[];
}