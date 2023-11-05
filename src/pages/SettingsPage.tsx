import { Grid } from "@mui/material";
import { useReducer } from "react";
import AddPortfolioSection from "../component/AddPortfolioSection";
import ShowPortfoliosSection from "../component/ShowPortfoliosSection";
import { SettingsContext, settingsReducer } from "../context/SettingsContext";

const initialState = {
  updateCount: 0,
};

export default function SettingsPage() {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ShowPortfoliosSection />
        </Grid>
        <Grid item xs={6}>
          <AddPortfolioSection />
        </Grid>
      </Grid>
    </SettingsContext.Provider>
  );
}
