import React, { useState } from 'react'
import { ViewAllTests } from '../components/lists/view-all-tests.component';
import { Header } from '../components/headers/header.component';
import { useAuth } from '../components/hooks/auth/useAuth';
import { AssignedTests } from '../components/lists/assigned-tests.component';
import { CompletedTests } from '../components/lists/completed-tests.component';
import { CreateTestButton } from '../components/buttons/create-test-button.component';

const HomePage: React.FC = () => {
  const [auth, setAuth] = useState<boolean>(false);

  useAuth(setAuth);

  return (
    <div>
      <Header />
      <div style={{ margin: '20px' }}>
        {auth ? (
          <>
            <AssignedTests />
            <CreateTestButton />
            <CompletedTests />
          </>
        ) : (<ViewAllTests />)}
      </div>
    </div>
  )
}

export { HomePage };
