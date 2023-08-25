import { Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SingleSelect from "./SingleSelect";
import React from "react";
import { listPortfolios } from "../api/ListPortfolios";
import { Portfolio } from "./AddPortfolioSection";

const columns: GridColDef[] = [
  { field: "code", headerName: "证券代码", width: 100 },
  { field: "name", headerName: "证券名称", width: 100 },
  { field: "volume", headerName: "持股数", width: 100 },
  { field: "value", headerName: "市值", width: 100 },
  { field: "profit", headerName: "盈亏", width: 100 },
];

export default function HoldingsSection() {
  const [portfolioOptions, setPortfolioOptions] = React.useState<string[]>([]);

  React.useEffect(() => {
    listPortfolios().then((portfolios) => {
      const tmp = portfolios?.map(function (portfolio) {
        return portfolio.name;
      });
      tmp && setPortfolioOptions(tmp);
    });
  }, []);

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <SingleSelect placeholder="选择投资组合" options={portfolioOptions} />
      </Grid>
      <Grid item xs={6}>
        当前现金:{" "}
      </Grid>
      <Grid item xs={6}>
        当前证券市值:{" "}
      </Grid>
      <Grid item xs={6}>
        总市值:{" "}
      </Grid>
      <Grid item xs={6}>
        收益率:{" "}
      </Grid>
      <Grid item xs={12}>
        <DataGrid columns={columns} rows={[]} />
      </Grid>
    </Grid>
  );
}
