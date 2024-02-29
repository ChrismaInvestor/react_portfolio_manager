import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../constant/Constant";
import { Card, CardContent, Grid, Typography } from "@mui/material";

export default function InvestorPLPage() {
  const { isLoading, data: investors } = useQuery({
    queryKey: ["investorBook"],
    queryFn: () =>
      fetch(BASE_URL + "portfolio/investorBook").then((res) => res.json()),

    refetchInterval: 30000,
  });

  if (isLoading) {
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
    </Grid>
  );
}
