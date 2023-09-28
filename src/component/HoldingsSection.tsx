import { Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SingleSelect from "./SingleSelect";
import React from "react";
import { listPortfolios } from "../api/ListPortfolios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../constant/Constant";
import { OrderPlacementContext } from "../context/OrderPlacementContext";

const columns: GridColDef[] = [
  { field: "securityCode", headerName: "证券代码", width: 100 },
  { field: "name", headerName: "证券名称", width: 100 },
  { field: "securityShare", headerName: "持股数", width: 100 },
  { field: "cost", headerName: "成本", width: 100 },
  { field: "value", headerName: "市值", width: 100 },
  { field: "profit", headerName: "盈亏", width: 100 },
];

export default function HoldingsSection() {
  const { state, dispatch } = React.useContext(OrderPlacementContext);

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

  const { isLoading, data } = useQuery({
    queryKey: ["getDynamics", currentPortfolio],
    queryFn: () =>
      fetch(
        BASE_URL + "portfolio/dynamics?currentPortfolio=" + currentPortfolio
      ).then((res) => res.json()),
    enabled: !!currentPortfolio,
  });

  const { data: portfolio } = useQuery({
    queryKey: ["listPositions", currentPortfolio],
    queryFn: () =>
      fetch(
        BASE_URL + "portfolio/portfolio?currentPortfolio=" + currentPortfolio
      ).then((res) => res.json()),
    enabled: !!currentPortfolio,
  });

  React.useMemo(() => {
    dispatch &&
      dispatch({ type: "selectPortfolio", payload: currentPortfolio });
  }, [currentPortfolio]);

  if (isLoading && !!currentPortfolio) {
    return <p>Loading...</p>;
  }

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <SingleSelect
          placeholder="选择投资组合"
          options={portfolioOptions}
          setValue={setCurrentPortfolio}
          value={state?.currentPortfolio}
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
      <Grid item xs={12} sx={{ height: 500 }}>
        <DataGrid
          columns={columns}
          rows={portfolio && !!portfolio.positions ? portfolio.positions : []}
        />
      </Grid>
    </Grid>
  );
}
