import { Grid } from "@mui/material";
import HoldingsSection from "../component/HoldingsSection";
import UploadOrderSection from "../component/UploadOrderSection";
import {
  OrderPlacementContext,
  orderPlacementReducer,
} from "../context/OrderPlacementContext";
import { useReducer } from "react";
import { BASE_URL } from "../constant/Constant";
import { useQuery } from "@tanstack/react-query";
import OrderProcessingSection from "../component/OrderProcessingSection";

const initialState = {
  currentPortfolio: null,
};

export default function OrderPlacementPage() {
  const [state, dispatch] = useReducer(orderPlacementReducer, initialState);

  const { isLoading, data } = useQuery({
    queryKey: ["listOrders", state.currentPortfolio],
    // queryKey: ["listOrders"],
    queryFn: () =>
      fetch(
        BASE_URL + "position/order?currentPortfolio=" + state.currentPortfolio
      )
        .then((res) => res.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            data[i].id = i + 1;
          }
          return data;
        }),
    // enabled: !!state.currentPortfolio,
    refetchInterval: 30000,
  });

  return (
    <OrderPlacementContext.Provider value={{ state, dispatch }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <HoldingsSection />
        </Grid>
        {data && data.length === 0 && (
          <Grid item xs={6}>
            <UploadOrderSection />
          </Grid>
        )}
        {data && data.length > 0 && (
          <Grid item xs={6}>
            <OrderProcessingSection orders={data} />
          </Grid>
        )}
      </Grid>
    </OrderPlacementContext.Provider>
  );
}
