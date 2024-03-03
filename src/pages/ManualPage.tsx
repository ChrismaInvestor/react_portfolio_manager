import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import SingleSelect from "../component/SingleSelect";
import usePortfolioOptions from "../hook/usePortfolioOptions";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../constant/Constant";

type Item = {
  securityCode: string;
  weight: number;
};

const list: Item[] = [];

export default function ManualPage() {
  const [items, setItems] = React.useState<Item[]>([]);

  const [currentPortfolio, setCurrentPortfolio] = React.useState<string>();

  const [portfolioOptions] = usePortfolioOptions();

  const [orders, setOrders] = React.useState([]);

  const handleClick = () => {
    setItems([...items, { securityCode: "", weight: 0 }]);
  };

  const handleDelete = (idx: number) => {
    items.splice(idx, 1);
    setItems([...items]);
  };

  const handleChange = (
    idx: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    items[idx] = {
      ...items[idx],
      [event.target.name]: event.target.value,
    };
    setItems([...items]);
  };

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(BASE_URL + "manual/cal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          portfolioName: currentPortfolio,
          securityAndWeights: items,
        }),
      });
    },
    onSuccess: async (data) => {
      const orders = await data.json();
      setOrders(orders);
    },
  });

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <Typography>手动下单</Typography>
            <SingleSelect
              placeholder="选择投资组合"
              options={portfolioOptions}
              setValue={setCurrentPortfolio}
              value={currentPortfolio}
            />
            {items.map((item, idx) => (
              <Stack key={idx} direction={"row"} spacing={2}>
                <TextField
                  placeholder="股票代码"
                  name="securityCode"
                  value={item.securityCode}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(idx, event)
                  }
                />
                <TextField
                  placeholder="权重"
                  name="weight"
                  value={item.weight}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(idx, event)
                  }
                />
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => handleDelete(idx)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Stack>
            ))}
            <Button variant="contained" onClick={handleClick}>
              Add
            </Button>
            <Button onClick={() => mutation.mutate()}>Calculate</Button>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          {!!orders && orders.map((order, idx) => <Box key={idx}>order</Box>)}
        </Grid>
      </Grid>
    </Container>
  );
}
