import React from 'react'
import { ViewAllTests } from '../components/lists/view-all-tests.component';
import { Header } from '../components/headers/header.component';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <div style={{ margin: '20px' }}>
        <ViewAllTests />
      </div>
    </div>
  )
}

export { HomePage };
