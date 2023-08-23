import React from "react";
import "./App.css";
import {
  Container,
  Drawer,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import UploadOrder from "./component/UploadOrderSection";
import HoldingsSection from "./component/HoldingsSection";
import HomeRoundedIcon from "@mui/icons-material/Home";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Routes from "./routes";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes />
    </HashRouter>
    // <Grid container spacing={2}>
    //   <Grid item xs={1}>
    //     <List sx={{ backgroundColor: "#f3f6fc", height: "100vh", pt: 2 }}>
    //       <ListItem key="首页">
    //         <Stack
    //           spacing={1}
    //           justifyContent="center"
    //           alignItems="center"
    //           sx={{ width: "100%" }}
    //         >
    //           <HomeRoundedIcon />
    //           <Typography variant="button" align="center">
    //             首页
    //           </Typography>
    //         </Stack>
    //       </ListItem>
    //       <ListItem key="投资组合维护">
    //         <Stack
    //           spacing={1}
    //           justifyContent="center"
    //           alignItems="center"
    //           sx={{ width: "100%" }}
    //         >
    //           <SettingsRoundedIcon />
    //           <Typography variant="button" align="center">
    //             投资组合维护
    //           </Typography>
    //         </Stack>
    //       </ListItem>
    //       <ListItem></ListItem>
    //     </List>
    //   </Grid>
    //   <Grid item xs={11}>
    //     <Grid container spacing={2}>
    //       <Grid item xs={6}>
    //         <HoldingsSection />
    //       </Grid>
    //       <Grid item xs={6}>
    //         <UploadOrder />
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </Grid>
  );
}

export default App;
