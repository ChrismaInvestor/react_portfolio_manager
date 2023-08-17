import React from "react";
import "./App.css";
import { Container, Grid } from "@mui/material";
import UploadOrder from "./component/UploadOrderSection";
import HoldingsSection from "./component/HoldingsSection";

function App() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <HoldingsSection />
        </Grid>
        <Grid item xs={6}>
          <UploadOrder />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
