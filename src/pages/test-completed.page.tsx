import React, { useState } from "react";
import { useAuth } from "../components/hooks/auth/useAuth";
import { Header } from "../components/headers/header.component";
import { Typography } from "@mui/material";
import { CompletedTestForm } from "../components/forms/completed-test-form.component";

const TestCompletedPage: React.FC = () => {
  const [auth, setAuth] = useState<boolean>(false);

  useAuth(setAuth);
  
  return (
    <div>
      <Header />
      <div style={{ margin: '20px' }}>
        {auth ? (
          <>
            <CompletedTestForm />
          </>
        ) : <Typography variant="h6">You are not authorized</Typography>}
      </div>
    </div>
  )
}

export { TestCompletedPage };