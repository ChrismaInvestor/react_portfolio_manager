import { Grid } from "@mui/material";
import React from "react";
import AddPortfolioSection from "../component/AddPortfolioSection";

export default function Settings() {
  const formRef = React.useRef<HTMLFormElement>(null);
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        Test
      </Grid>
      <Grid item xs={6}>
        <AddPortfolioSection />
      </Grid>
    </Grid>
  );
}
