import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import React from "react";

export default function AddPortfolioSection() {
  const formRef = React.useRef<HTMLFormElement>(null);
  return (
      <Paper sx={{m:2, p:2}}>
        <form ref={formRef}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">新增投资组合</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="名称"
                fullWidth
                placeholder="请输入投资组合名称"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="描述"
                fullWidth
                placeholder="请描述该投资组合"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="关联账户"
                fullWidth
                placeholder="请输入在券商的关联账户"
                required
              />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" sx={{width:"25%"}}>新增</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
  );
}
