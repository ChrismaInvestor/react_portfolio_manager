import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { BASE_URL } from "../constant/Constant";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function DataValidationPage() {
  const [stocksUpdateStatus, setStocksUpdateStatus] =
    React.useState<string>("股票列表更新");

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(BASE_URL + "data/stockList", {
        method: "GET",
      });
    },
    onSuccess: (data) => {
      data.json().then((data) => setStocksUpdateStatus(data.data));
    },
  });

  const handleStockUpdateClick = () => {
    mutation.mutate();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Button
          sx={{ width: "100%", height: 200 }}
          onClick={handleStockUpdateClick}
        >
          <Card
            sx={{ width: "100%", height: "100%", backgroundColor: "lightblue" }}
          >
            <Typography variant="h4" alignContent={"center"}>
              股票列表更新
            </Typography>
            {mutation.isLoading ? (
              <CircularProgress />
            ) : (
              <Typography variant="h5" alignContent={"center"}>
                {stocksUpdateStatus}
              </Typography>
            )}
          </Card>
        </Button>
      </Grid>
    </Grid>
  );
}
