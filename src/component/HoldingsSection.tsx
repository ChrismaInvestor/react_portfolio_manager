import { Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SingleSelect from "./SingleSelect";
import React from "react";
import { listPortfolios } from "../api/ListPortfolios";
import { Portfolio } from "./AddPortfolioSection";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../constant/Constant";

const columns: GridColDef[] = [
  { field: "code", headerName: "证券代码", width: 100 },
  { field: "name", headerName: "证券名称", width: 100 },
  { field: "volume", headerName: "持股数", width: 100 },
  { field: "value", headerName: "市值", width: 100 },
  { field: "profit", headerName: "盈亏", width: 100 },
];

export default function HoldingsSection() {
  const [portfolioOptions, setPortfolioOptions] = React.useState<string[]>([]);
  const [currentPortfolio, setCurrentPortfolio] = React.useState<string>();

  React.useEffect(() => {
    listPortfolios().then((portfolios) => {
      const tmp = portfolios?.map(function (portfolio) {
        return portfolio.name;
      });
      tmp && setPortfolioOptions(tmp);
    });
  }, []);

  const { isLoading, data } = useQuery(["getDynamics", currentPortfolio], () =>
    fetch(
      BASE_URL + "portfolio/dynamics?currentPortfolio=" + currentPortfolio
    ).then((res) => res.json())
  );

  console.log(data);

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <SingleSelect
          placeholder="选择投资组合"
          options={portfolioOptions}
          setValue={setCurrentPortfolio}
          value={currentPortfolio}
        />
      </Grid>
      <Grid item xs={6}>
        当前现金:{data && data.cash}
      </Grid>
      <Grid item xs={6}>
        当前证券市值:{data && data.securityMarketValue}
      </Grid>
      <Grid item xs={6}>
        总市值:{data && data.totalMarketValue}
      </Grid>
      <Grid item xs={6}>
        收益率:{data && data.profitMargin}
      </Grid>
      <Grid item xs={12}>
        <DataGrid columns={columns} rows={[]} />
      </Grid>
    </Grid>
  );
}
