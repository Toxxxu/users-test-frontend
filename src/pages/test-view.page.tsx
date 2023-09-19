import React, { useState } from "react";
import { useAuth } from "../components/hooks/auth/useAuth";
import { Header } from "../components/headers/header.component";
import { TestViewForm } from "../components/forms/test-view-form.component";
import { Typography } from "@mui/material";

const TestViewPage: React.FC = () => {
  const [auth, setAuth] = useState<boolean>(false);

  useAuth(setAuth);
  
  return (
    <div>
      <Header />
      <div style={{ margin: '20px' }}>
        {auth ? (
          <>
            <TestViewForm />
          </>
        ) : <Typography variant="h6">You are not authorized</Typography>}
      </div>
    </div>
  )
}

export { TestViewPage };