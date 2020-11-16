import React from "react";
import { Container } from "@material-ui/core";
import { CreateFieldForm } from "../components/forms";

export const CreateFieldBox = () => {
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CreateFieldForm />
      </Container>
    </div>
  );
};
