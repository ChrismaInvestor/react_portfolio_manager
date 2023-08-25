import { Grid, Stack, Typography } from "@mui/material";
import { Portfolio } from "./AddPortfolioSection";

export default function ShowPortfolioCard(props: Portfolio) {
  const { name, description, account } = props;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Stack spacing={1}>
          <Typography>
            <strong>{name}</strong>
          </Typography>
          <Typography>{account}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={1}>
          <Typography variant="body2">{description}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
