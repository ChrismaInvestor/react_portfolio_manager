import {
  Button,
  Card,
  CardContent,
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
import { Order } from "../type/Order";
import PreorderDialog from "../component/PreorderDialog";

type Item = {
  securityCode: string;
  weight: number;
};

export default function ManualPage() {
  const [items, setItems] = React.useState<Item[]>([]);

  const [currentPortfolio, setCurrentPortfolio] = React.useState<string>();

  const [portfolioOptions] = usePortfolioOptions();

  const [orders, setOrders] = React.useState<Order[]>([]);

  const [openDialog, setOpenDialog] = React.useState(false);

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
      const orders: Order[] = await data.json();
      for (let i = 0; i < orders.length; i++) {
        orders[i].id = i + 1;
      }
      setOrders(orders);
    },
  });

  function ResultCards() {
    const { isLoading, isError } = mutation;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Error in calculating orders</div>;
    }

    return orders.map((order: Order, idx: number) => (
      <Card sx={{ backgroundColor: "lightblue" }} key={idx}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            股票代码: {order.securityCode}, 股票名称:
            {order.securityName}
          </Typography>
          <Typography variant="h5" component="div">
            购买数量: {order.share}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            预估市值: {order.value}
          </Typography>
        </CardContent>
      </Card>
    ));
  }

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={6}>
        <Stack spacing={2}>
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
            新增
          </Button>
          <Button onClick={() => mutation.mutate()}>试算</Button>
          <Button
            disabled={orders.length === 0}
            variant="outlined"
            onClick={() => setOpenDialog(true)}
          >
            下单
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        {ResultCards()}
      </Grid>
      {currentPortfolio && (
        <PreorderDialog
          open={openDialog}
          orders={orders}
          handleClose={() => setOpenDialog(false)}
          portfolioName={currentPortfolio}
        />
      )}
    </Grid>
  );
}
