import React from "react";
import { Typography, Container, CssBaseline, Box } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { LoginForm } from "../components/forms";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href=""></Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const LoginBox = () => {
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <LoginForm />
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};
