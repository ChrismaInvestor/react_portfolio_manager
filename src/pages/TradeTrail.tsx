import { Button, Grid, Paper, Stack, TextField } from "@mui/material";
import SingleSelect from "../component/SingleSelect";
import React from "react";

export default function TradeTrail() {
  const [tradingExecutionStrategy, setTradingExecutionStrategy] =
    React.useState<string>();

  const [stock, setStock] = React.useState<string>();

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Stack spacing={2}>
          <SingleSelect
            placeholder="选择交易执行策略"
            options={["买单驱动卖单"]}
            setValue={setTradingExecutionStrategy}
            value={tradingExecutionStrategy}
          />
          <TextField
            label="选择股票"
            placeholder="选择股票"
            name="stock"
            value={stock}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setStock(event.target.value)
            }
          />
          <Button variant="contained">试算</Button>
        </Stack>
      </Grid>
      <Grid item xs={9}>
            <Paper elevation={0} sx={{border:1, height:"90vh"}}>

            </Paper>

      </Grid>
    </Grid>
  );
}
