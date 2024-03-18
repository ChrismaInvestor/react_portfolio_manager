import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../constant/Constant";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import CustLineChart from "../component/CustLineChart";
import { LineSeriesType } from "@mui/x-charts";

export default function InvestorPLPage() {
  const { isLoading, data: investors } = useQuery({
    queryKey: ["investorBook"],
    queryFn: () =>
      fetch(BASE_URL + "portfolio/investorBook").then((res) => res.json()),

    refetchInterval: 30000,
  });
  const { isLoading: isNavHistoryLoading, data: navs } = useQuery({
    queryKey: ["navHistory"],
    queryFn: () => fetch(BASE_URL + "portfolio/nav").then((res) => res.json()),

    refetchInterval: 30000,
  });

  const chartData: {
    datesForChart: string[];
    valuesForChart: LineSeriesType[];
  } = React.useMemo(() => {
    if (!navs) {
      return {
        datesForChart: [],
        valuesForChart: [],
      };
    }
    const dates = new Set<string>();
    const map = new Map<string, number[]>();
    navs.forEach((nav: any) => {
      dates.add(nav.date);
      if (map.has(nav.portfolioName)) {
        map.get(nav.portfolioName)!.push(nav.nav);
      } else {
        map.set(nav.portfolioName, [nav.nav]);
      }
    });

    const values: LineSeriesType[] = [];

    for (const key of map.keys()) {
      values.push({
        type: "line",
        data: map.get(key),
        label: key,
      });
    }

    return {
      datesForChart: Array.from(dates),
      valuesForChart: values,
    };
  }, [navs]);

  if (isLoading || isNavHistoryLoading) {
    return <>Loading...</>;
  }

  return (
    <Grid container spacing={2}>
      {investors.map(
        (investor: {
          name: string;
          portfolioName: string;
          shareAmount: string;
          nav: string;
        }) => (
          <Grid item xs={3}>
            <Card sx={{ backgroundColor: "lightblue" }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {investor.name}
                </Typography>
                <Typography variant="h5" component="div">
                  {investor.portfolioName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  持有份额: {investor.shareAmount}
                </Typography>
                <Typography variant="body2">净值: {investor.nav}</Typography>
                <Typography variant="body2">
                  市值: {Number(investor.nav) * Number(investor.shareAmount)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )
      )}
      <Grid item xs={12}>
        <CustLineChart
          title={"净值趋势"}
          xAxis={chartData.datesForChart}
          value={chartData.valuesForChart}
        />
      </Grid>
    </Grid>
  );
}
