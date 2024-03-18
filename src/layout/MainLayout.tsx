import { Grid, List, ListItem, Stack, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/Home";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ScienceIcon from '@mui/icons-material/Science';
import React from "react";

const routes = [
  { name: "首页", icon: <HomeRoundedIcon />, path: "/orderPlacement" },
  {
    name: "手工下单",
    icon: <FitnessCenterIcon />,
    path: "/manualOrderPlacement",
  },
  {
    name: "投资组合维护",
    icon: <SettingsRoundedIcon />,
    path: "/settings",
  },
  {
    name: "数据同步",
    icon: <DataUsageIcon />,
    path: "/data",
  },
  {
    name: "个人收益",
    icon: <PersonSearchIcon />,
    path: "/investorPL",
  },
  {
    name: "交易策略试算",
    icon: <ScienceIcon />,
    path: "/tradeTrail",
  },
];

export default function MainLayout() {
  const [optPage, setOptPage] = React.useState<String>("");
  return (
    <Grid container spacing={2}>
      <Grid item xs={1}>
        <List sx={{ backgroundColor: "#f3f6fc", height: "100vh", pt: 2 }}>
          {routes.map((route) => (
            <ListItem key={route.name} onClick={() => setOptPage(route.name)}>
              <Stack
                spacing={1}
                justifyContent="center"
                alignItems="center"
                sx={{
                  width: "100%",
                  backgroundColor:
                    optPage === route.name ? "PowderBlue" : "default",
                  borderRadius: "10%",
                }}
              >
                <Link to={route.path}>{route.icon}</Link>
                <Typography variant="button" align="center">
                  {route.name}
                </Typography>
              </Stack>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={11}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
