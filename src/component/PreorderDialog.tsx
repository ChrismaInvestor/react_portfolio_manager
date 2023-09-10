import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { OrderPlacementContext } from "../context/OrderPlacementContext";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../constant/Constant";

type Props = {
  open: boolean;
  data: any[];
};

const columns: GridColDef[] = [
  { field: "buyOrSell", headerName: "方向", width: 80 },
  { field: "securityCode", headerName: "证券代码", width: 120 },
  { field: "securityName", headerName: "证券名称", width: 100 },
  { field: "share", headerName: "预估份数", width: 100, type: "number" },
  { field: "value", headerName: "预估市值", width: 100, type: "number" },
];

export default function PreorderDialog(props: Props) {
  const { open, data } = props;

  const { state } = React.useContext(OrderPlacementContext);

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(BASE_URL + "position/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orders: data,
          portfolio: state?.currentPortfolio,
        }),
      }).then((res) => res.json());
    },
  });

  return (
    <Dialog open={open}>
      <DialogTitle>
        <Stack direction={"row"} spacing={2}>
          <Typography>试算</Typography>
          <Button
            variant="contained"
            onClick={() => {
              mutation.mutate();
            }}
          >
            提交
          </Button>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DataGrid columns={columns} rows={data} />
      </DialogContent>
    </Dialog>
  );
}
