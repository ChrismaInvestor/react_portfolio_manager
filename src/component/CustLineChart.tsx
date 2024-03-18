import { Card, CardContent, CardHeader } from "@mui/material";
import { LineChart, LineSeriesType } from "@mui/x-charts";

type Props = {
  title: string;
  xAxis: string[];
  value: LineSeriesType[];
};

export default function CustLineChart(props: Props) {
  const { title, xAxis, value } = props;
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <LineChart
        //   yAxis={[
        //     {
        //       min: 0,
        //     },
        //   ]}
          xAxis={[
            {
              scaleType: "point",
              data: xAxis,
            },
          ]}
          series={value}
          height={300}
        />
      </CardContent>
    </Card>
  );
}
