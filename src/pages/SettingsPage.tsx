import { Grid } from "@mui/material";
import React from "react";
import AddPortfolioSection from "../component/AddPortfolioSection";
import ShowPortfoliosSection from "../component/ShowPortfoliosSection";

export default function SettingsPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <ShowPortfoliosSection />
      </Grid>
      <Grid item xs={6}>
        <AddPortfolioSection />
      </Grid>
    </Grid>
  );
}
