import React, { useState } from "react";
import { useAuth } from "../components/hooks/auth/useAuth";
import { Header } from "../components/headers/header.component";
import { Typography } from "@mui/material";
import { CreateTestForm } from "../components/forms/create-test-form.component";

const CreateTestPage: React.FC = () => {
  const [auth, setAuth] = useState<boolean>(false);

  useAuth(setAuth);
  
  return (
    <div>
      <Header />
      <div style={{ margin: '20px' }}>
        {auth ? (
          <>
            <CreateTestForm />
          </>
        ) : <Typography variant="h6">You are not authorized</Typography>}
      </div>
    </div>
  )
}

export { CreateTestPage };