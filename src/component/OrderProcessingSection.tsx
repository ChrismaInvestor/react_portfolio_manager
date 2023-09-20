import { Stack, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridSlotsComponentsProps,
} from "@mui/x-data-grid";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import React from "react";

const columns: GridColDef[] = [
  { field: "buyOrSell", headerName: "方向", width: 80 },
  { field: "securityCode", headerName: "证券代码", width: 120 },
  { field: "securityName", headerName: "证券名称", width: 100 },
  { field: "ratio", headerName: "完成率", width: 100 },
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
  const [status, setStatus] = React.useState<Status>("connected");
  return (
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
  );
}
