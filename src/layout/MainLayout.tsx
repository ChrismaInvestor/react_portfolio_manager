import { Grid, List, ListItem, Stack, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/Home";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import React from "react";

export default function MainLayout() {
  const [optPage, setOptPage] = React.useState<String>("");
  return (
    <Grid container spacing={2}>
      <Grid item xs={1}>
        <List sx={{ backgroundColor: "#f3f6fc", height: "100vh", pt: 2 }}>
          <ListItem key="首页" onClick={() => setOptPage("首页")}>
            <Stack
              spacing={1}
              justifyContent="center"
              alignItems="center"
              sx={{
                width: "100%",
                backgroundColor: optPage === "首页" ? "PowderBlue" : "default",
                borderRadius: "10%",
              }}
            >
              <Link to={"/orderPlacement"}>
                <HomeRoundedIcon />
              </Link>
              <Typography variant="button" align="center">
                首页
              </Typography>
            </Stack>
          </ListItem>
          <ListItem key="手工下单" onClick={() => setOptPage("手工下单")}>
            <Stack
              spacing={1}
              justifyContent="center"
              alignItems="center"
              sx={{
                width: "100%",
                backgroundColor:
                  optPage === "手工下单" ? "PowderBlue" : "default",
                borderRadius: "10%",
              }}
            >
              <Link to={"/manualOrderPlacement"}>
                <FitnessCenterIcon />
              </Link>
              <Typography variant="button" align="center">
                手工下单
              </Typography>
            </Stack>
          </ListItem>
          <ListItem
            key="投资组合维护"
            onClick={() => setOptPage("投资组合维护")}
          >
            <Stack
              spacing={1}
              justifyContent="center"
              alignItems="center"
              sx={{
                width: "100%",
                backgroundColor:
                  optPage === "投资组合维护" ? "PowderBlue" : "default",
                borderRadius: "10%",
              }}
            >
              <Link to={"/settings"}>
                <SettingsRoundedIcon />
              </Link>
              <Typography variant="button" align="center">
                投资组合维护
              </Typography>
            </Stack>
          </ListItem>
          <ListItem key="数据校验" onClick={() => setOptPage("数据校验")}>
            <Stack
              spacing={1}
              justifyContent="center"
              alignItems="center"
              sx={{
                width: "100%",
                backgroundColor:
                  optPage === "数据校验" ? "PowderBlue" : "default",
                borderRadius: "10%",
              }}
            >
              <Link to={"/data"}>
                <DataUsageIcon />
              </Link>
              <Typography variant="button" align="center">
                数据校验
              </Typography>
            </Stack>
          </ListItem>

          <ListItem key="个人收益" onClick={() => setOptPage("个人收益")}>
            <Stack
              spacing={1}
              justifyContent="center"
              alignItems="center"
              sx={{
                width: "100%",
                backgroundColor:
                  optPage === "个人收益" ? "PowderBlue" : "default",
                borderRadius: "10%",
              }}
            >
              <Link to={"/investorPL"}>
                <PersonSearchIcon />
              </Link>
              <Typography variant="button" align="center">
                个人收益
              </Typography>
            </Stack>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={11}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
