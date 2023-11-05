import React from "react";
import { Portfolio } from "./AddPortfolioSection";
import ShowPortfolioCard from "./ShowPortfolioCard";
import { Box, List, ListItemButton, Stack } from "@mui/material";
import { listPortfolios } from "../api/ListPortfolios";
import { SettingsContext } from "../context/SettingsContext";

export default function ShowPortfoliosSection() {
  const [portfolios, setPortfolios] = React.useState<Portfolio[]>([]);

  const { state } = React.useContext(SettingsContext);

  React.useEffect(() => {
    listPortfolios().then((portfolios) => {
      portfolios && setPortfolios(portfolios);
    });
  }, [state.updateCount]);

  return (
    <Box sx={{ p: 2 }}>
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
