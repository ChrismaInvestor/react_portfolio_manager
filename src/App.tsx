import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Routes from "./routes";
import { HashRouter } from "react-router-dom";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes />
      </HashRouter>
    </QueryClientProvider>
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
