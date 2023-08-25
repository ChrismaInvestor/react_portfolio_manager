import React from "react";
import { Portfolio } from "./AddPortfolioSection";
import ShowPortfolioCard from "./ShowPortfolioCard";
import { Box, List, ListItemButton, Stack } from "@mui/material";
import { listPortfolios } from "../api/ListPortfolios";

export default function ShowPortfoliosSection() {
  const [portfolios, setPortfolios] = React.useState<Portfolio[]>([]);

  React.useEffect(() => {
    console.log("Place holding");
    listPortfolios().then((portfolios) => {
      portfolios && setPortfolios(portfolios);
    });
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
