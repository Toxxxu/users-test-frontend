import React, { useState } from 'react'
import { ViewAllTests } from '../components/lists/view-all-tests.component';
import { Header } from '../components/headers/header.component';
import { useAuth } from '../components/hooks/auth/useAuth';

const HomePage: React.FC = () => {
  const [auth, setAuth] = useState<boolean>(false);

  useAuth(setAuth);

  return (
    <div>
      <Header />
      <div style={{ margin: '20px' }}>
        {auth ? (<div></div>) : (<ViewAllTests />)}
      </div>
    </div>
  )
}

export { HomePage };
