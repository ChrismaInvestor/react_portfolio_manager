import { Grid } from "@mui/material";
import HoldingsSection from "../component/HoldingsSection";
import UploadOrderSection from "../component/UploadOrderSection";
import {
  OrderPlacementContext,
  orderPlacementReducer,
} from "../context/OrderPlacementContext";
import { useReducer } from "react";

const initialState = {
  currentPortfolio: null,
};

export default function OrderPlacementPage() {
  const [state, dispatch] = useReducer(orderPlacementReducer, initialState);

  return (
    <OrderPlacementContext.Provider value={{ state, dispatch }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <HoldingsSection />
        </Grid>
        <Grid item xs={6}>
          <UploadOrderSection />
        </Grid>
      </Grid>
    </OrderPlacementContext.Provider>
  );
}
