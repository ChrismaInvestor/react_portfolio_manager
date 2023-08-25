import React from "react";
import { Portfolio } from "./AddPortfolioSection";
import ShowPortfolioCard from "./ShowPortfolioCard";
import { Box, List, ListItemButton, Stack } from "@mui/material";
import { BASE_URL } from "../constant/Constant";

export default function ShowPortfoliosSection() {
  const [portfolios, setPortfolios] = React.useState<Portfolio[]>([]);

  const listPortfolios = async () => {
    const res = await fetch(BASE_URL + "portfolio", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 200) {
      const result: Portfolio[] = await res.json();
      setPortfolios(result);
    }
  };
  React.useEffect(() => {
    console.log("Place holding");
    listPortfolios();
    // const res = await fetch(BASE_URL + "portfolio", {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //   });
  }, []);

  return (
    <Box sx={{ m: 2, p: 2 }}>
      <Stack spacing={1}>
        <List disablePadding>
          {portfolios.map((portfolio, index) => (
            <ListItemButton
              key={index}
              sx={{ border: 1, borderColor: "#e5e7eb" }}
            >
              <ShowPortfolioCard
                name={portfolio.name}
                description={portfolio.description}
                account={portfolio.account}
              />
            </ListItemButton>
          ))}
        </List>
      </Stack>
    </Box>
  );
}
