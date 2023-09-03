import { Grid, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React, { ReactNode } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import StatusButton, { ButtonStatus } from "./StatusButton";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../constant/Constant";
import { OrderPlacementContext } from "../context/OrderPlacementContext";

async function handleFileInputChange(file: File) {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const firstSheetName = workbook.SheetNames[0];
  if (!!firstSheetName) {
    const worksheet = workbook.Sheets[firstSheetName];
    if (!!worksheet) {
      const sheetData: any[] = XLSX.utils.sheet_to_json(worksheet);
      for (let i = 0; i < sheetData.length; i++) {
        sheetData[i].id = i + 1;
      }
      return sheetData;
    }
  }
  return [];
}

const columns: GridColDef[] = [
  { field: "code", headerName: "证券代码", width: 200 },
  { field: "name", headerName: "证券名称", width: 200 },
];

export default function UploadOrderSection() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const { state } = React.useContext(OrderPlacementContext);

  const files = React.useMemo(() => {
    const ans: ReactNode[] = [];
    acceptedFiles.forEach((file) => {
      ans.push(
        <li key={file.name}>
          {file.name} - {file.size} bytes
        </li>
      );
    });
    return ans;
  }, [acceptedFiles]);

  const [data, setData] = React.useState<GridRowsProp>([]);

  React.useEffect(() => {
    if (!!acceptedFiles[0]) {
      setData([]);
      const data = handleFileInputChange(acceptedFiles[0]);
      data.then((record) => {
        console.log(record);
        setData(record);
      });
    }
  }, [acceptedFiles[0]]);

  const [buttonStatus, setButtonStatus] = React.useState<ButtonStatus>("");

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(BASE_URL + "position", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          positions: data,
          portfolio: state?.currentPortfolio,
        }),
      });
    },
  });

  React.useMemo(() => {
    if (data.length > 0) {
      setButtonStatus("READY");
    }
  }, [data]);

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={4}>
        <div {...getRootProps({ className: "dropzone" })}>
          <Paper>
            <input {...getInputProps()} />
            <Typography align="center">点击此处上传</Typography>
          </Paper>
        </div>
      </Grid>
      <Grid item xs={4}>
        <aside>
          <ul>{files}</ul>
        </aside>
      </Grid>
      <Grid item xs={4}>
        <StatusButton
          buttonStatus={buttonStatus}
          submit={() => {
            const post = {
              data: data,
              portfolio: state?.currentPortfolio,
            };
            mutation.mutate();
          }}
        />
      </Grid>
      <Grid item xs={12} sx={{ height: 800 }}>
        <DataGrid columns={columns} rows={data} />
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
  );
}
