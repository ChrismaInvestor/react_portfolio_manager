import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

type Props = {
  buttonStatus: string;
  submit: () => void;
};

export type ButtonStatus = "SUCCEED" | "ERROR" | "LOADING" | "READY" | "";

export default function StatusButton(props: Props) {
  const { buttonStatus, submit } = props;
  switch (buttonStatus) {
    case "SUCCEED":
      return (
        <Button variant="contained" color="success">
          成功
        </Button>
      );
    case "ERROR":
      return (
        <Button variant="outlined" color="error">
          错误
        </Button>
      );
    case "LOADING":
      return (
        <LoadingButton
          loading
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
        >
          处理中
        </LoadingButton>
      );
    case "READY":
      return (
        <Button variant="contained" color="primary" onClick={submit}>
          试算
        </Button>
      );

    default:
      return (
        <Button variant="contained" color="primary" disabled>
          试算
        </Button>
      );
  }
}
