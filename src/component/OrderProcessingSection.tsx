import { Grid, Stack, Typography, styled } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSlotsComponentsProps,
} from "@mui/x-data-grid";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import React from "react";

const Progress = styled("progress")(() => `background: blue,`);

const columns: GridColDef[] = [
  { field: "buyOrSell", headerName: "方向", width: 80 },
  { field: "securityCode", headerName: "证券代码", width: 120 },
  { field: "securityName", headerName: "证券名称", width: 100 },
  {
    field: "ratio",
    headerName: "完成率",
    width: 220,
    type: "number",
    renderCell: (params: GridRenderCellParams<any>) => (
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <Progress value={String(params.value)} max="100" />
        </Grid>
        <Grid item xs={2}>
          <Typography>{params.value + "%"}</Typography>
          {/* <span>{params.value + "%"}</span> */}
        </Grid>
      </Grid>
    ),
  },
];

type Status = "connected" | "disconnected";

type Props = {
  orders: any[];
};

declare module "@mui/x-data-grid" {
  interface FooterPropsOverrides {
    status: Status;
  }
}

export function CustomStatusComponent(
  props: NonNullable<GridSlotsComponentsProps["footer"]>
) {
  return (
    <Stack direction={"row"} sx={{ p: 1 }} spacing={1}>
      <FiberManualRecordIcon
        sx={{ color: props.status === "connected" ? "#4caf50" : "#d9182e" }}
      />
      <Typography>{props.status}</Typography>
    </Stack>
  );
}

export default function OrderProcessingSection(props: Props) {
  const { orders } = props;
  const [status] = React.useState<Status>("connected");
  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <DataGrid
          columns={columns}
          rows={orders ? orders : []}
          sx={{ maxHeight: 600 }}
          slots={{
            footer: CustomStatusComponent,
          }}
          slotProps={{
            footer: { status },
          }}
        />
      </Grid>
    </Grid>
  );
}
