import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../constant/Constant";
import { Card, CardContent, Typography } from "@mui/material";

export default function InvestorPLPage() {
  const { isLoading, data: investors } = useQuery({
    queryKey: ["investorBook"],
    queryFn: () =>
      fetch(BASE_URL + "portfolio/investorBook").then((res) => res.json()),

    refetchInterval: 30000,
  });

  console.log(investors);
  if (isLoading) {
    return <>Loading...</>;
  }

  return investors.map(
    (investor: {
      name: string;
      portfolioName: string;
      shareAmount: string;
      nav: string;
    }) => (
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {investor.name}
        </Typography>
        <Typography variant="h5" component="div">
          {investor.portfolioName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {investor.shareAmount}
        </Typography>
        <Typography variant="body2">{investor.nav}</Typography>
        <Typography variant="body2">
          {Number(investor.nav) * Number(investor.shareAmount)}
        </Typography>
      </CardContent>
    )
  );
}
