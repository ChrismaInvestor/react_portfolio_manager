import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { BASE_URL } from "../constant/Constant";

export type Portfolio = {
  name: string;
  description: string;
  account: string;
};

export default function AddPortfolioSection() {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [portfolio, setPortfolio] = React.useState<Portfolio>({
    name: "",
    description: "",
    account: "",
  });

  const handleChange = (e: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    const { name, value } = e.target;
    setPortfolio((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addPortfolio = async () => {
    if (formRef.current?.reportValidity()) {
      const res = await fetch(BASE_URL + "portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(portfolio),
      });

      if (res.status === 200) {
      }
    }
  };

  return (
    <Paper sx={{ m: 2, p: 2 }}>
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
              name="name"
              value={portfolio.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="描述"
              fullWidth
              placeholder="请描述该投资组合"
              name="description"
              value={portfolio.description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="关联账户"
              fullWidth
              placeholder="请输入在券商的关联账户"
              name="account"
              value={portfolio.account}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ width: "25%" }}
              onClick={addPortfolio}
            >
              新增
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
