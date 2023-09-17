import React from 'react'
import { ViewAllTests } from '../components/lists/view-all-tests.component';
import { Header } from '../components/headers/header.component';
import useAuth from '../components/hooks/auth/useAuth';

const HomePage: React.FC = () => {
  const auth = useAuth();

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
