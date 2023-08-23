import { Grid } from "@mui/material";
import HoldingsSection from "../component/HoldingsSection";
import UploadOrderSection from "../component/UploadOrderSection";

export default function OrderPlacementPage(){
    return(
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <HoldingsSection />
          </Grid>
          <Grid item xs={6}>
            <UploadOrderSection />
          </Grid>
        </Grid>
    )
}
