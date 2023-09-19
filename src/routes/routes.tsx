import React from 'react';
import { Routes as ReactRouterRoutes, Route } from 'react-router-dom';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { SignupPage } from '../pages/signup.page';
import { TestViewPage } from '../pages/test-view.page';
import { TestCompletedPage } from '../pages/test-completed.page';

const Routes: React.FC = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="/completed-test/:testId" element={<TestCompletedPage />} />
      <Route path="/test-view/:testId" element={<TestViewPage />} />
    </ReactRouterRoutes>
  )
}

export { Routes };