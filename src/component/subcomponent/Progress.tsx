import * as React from "react";
import clsx from "clsx";
import { createTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

const defaultTheme = createTheme();

// const useStyles = makeStyles(
//   (theme) =>
//     createStyles({
//       root: {
//         border: `1px solid ${theme.palette.divider}`,
//         position: "relative",
//         overflow: "hidden",
//         width: "100%",
//         height: 26,
//         borderRadius: 2,
//       },
//       value: {
//         position: "absolute",
//         lineHeight: "24px",
//         width: "100%",
//         display: "flex",
//         justifyContent: "center",
//       },
//       bar: {
//         height: "100%",
//         "&.low": {
//           backgroundColor: "#f44336",
//         },
//         "&.medium": {
//           backgroundColor: "#efbb5aa3",
//         },
//         "&.high": {
//           backgroundColor: "#088208a3",
//         },
//       },
//     }),
//   { defaultTheme }
// );

const Root = styled("div")(
  ({ theme }) => `
border: 1px solid ${theme.palette.divider},
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: 26,
        border-radius: 2,`
);

const Value = styled("div")(
  ({ theme }) => `
    position: "absolute",
    lineHeight: "24px",
    width: "100%",
    display: "flex",
    justifyContent: "center",`
);

interface ProgressBarProps {
  value: number;
}

const ProgressBar = React.memo(function ProgressBar(props: ProgressBarProps) {
  const { value } = props;
  const valueInPercent = value * 100;

  return (
    <Root>
      <Value>{`${valueInPercent.toLocaleString()} %`}</Value>
      {/* <div
        className={clsx(classes.bar, {
          low: valueInPercent < 30,
          medium: valueInPercent >= 30 && valueInPercent <= 70,
          high: valueInPercent > 70,
        })}
        style={{ maxWidth: `${valueInPercent}%` }}
      /> */}
    </Root>
  );
});

export function renderProgress(params: any) {
  return <ProgressBar value={Number(params.value)!} />;
}
