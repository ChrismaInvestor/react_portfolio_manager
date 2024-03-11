import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { OrderPlacementContext } from "../context/OrderPlacementContext";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../constant/Constant";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Order } from "../type/Order";

type Props = {
  open: boolean;
  orders: Order[];
  handleClose: () => void;
  portfolioName: string;
};

const columns: GridColDef[] = [
  { field: "buyOrSell", headerName: "方向", width: 80 },
  { field: "securityCode", headerName: "证券代码", width: 120 },
  { field: "securityName", headerName: "证券名称", width: 100 },
  { field: "share", headerName: "预估份数", width: 100, type: "number" },
  { field: "value", headerName: "预估市值", width: 100, type: "number" },
];

const ordersToSubmit: Order[] = [];

function CustDialogContent(props: Props) {
  const { orders, portfolioName, handleClose } = props;
  const [startTime, setStartTime] = React.useState<Dayjs | null>(null);

  const [endTime, setEndTime] = React.useState<Dayjs | null>(null);

  const mutation = useMutation({
    mutationFn: () => {
      console.log(ordersToSubmit);
      return fetch(BASE_URL + "position/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orders: ordersToSubmit,
          portfolio: portfolioName,
          startTime: startTime,
          endTime: endTime,
        }),
      });
    },
    onSuccess: () => {
      handleClose();
    },
  });

  const { isLoading, isError } = mutation;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <>
      <DialogTitle>
        <Stack direction={"row"} spacing={2}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Typography>试算</Typography>
            </Grid>
            <Grid item xs={5}>
              <DateTimePicker
                label="开始时间"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                disablePast
              />
            </Grid>
            <Grid item xs={5}>
              <DateTimePicker
                label="结束时间"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                disablePast
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  mutation.mutate();
                }}
              >
                提交
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DataGrid
          columns={columns}
          rows={orders}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            // const newOrders: Order[] = [];
            ordersToSubmit.length = 0;
            newRowSelectionModel.forEach((idx: any) => {
              ordersToSubmit.push(orders[idx - 1]);
            });
            console.log(ordersToSubmit);
          }}
        />
      </DialogContent>
    </>
  );
}

export default function PreorderDialog(props: Props) {
  const { open, handleClose } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={handleClose}>
        <CustDialogContent {...props} />
      </Dialog>
    </LocalizationProvider>
  );
}
