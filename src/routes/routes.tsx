import React from 'react';
import { Routes as ReactRouterRoutes, Route } from 'react-router-dom';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { SignupPage } from '../pages/signup.page';
import { CompletedTestForm } from '../components/views/completed-test-form.component';

const Routes: React.FC = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="/completed-test/:testId" element={<CompletedTestForm />} />
    </ReactRouterRoutes>
  )
}

export { Routes };