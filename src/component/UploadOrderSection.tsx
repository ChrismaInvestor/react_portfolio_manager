import { Grid, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { ReactNode } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import StatusButton, { ButtonStatus } from "./StatusButton";

async function handleFileInputChange(file: File) {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const firstSheetName = workbook.SheetNames[0];
  if (!!firstSheetName) {
    const worksheet = workbook.Sheets[firstSheetName];
    if (!!worksheet) {
      const sheetData = XLSX.utils.sheet_to_json(worksheet);
      for (let i = 0; i < sheetData.length; i++) {
        // sheetData[i].id=i+1;
      }
    }
  }
}

const columns: GridColDef[] = [
  { field: "证券代码", headerName: "证券代码", width: 200 },
  { field: "证券名称", headerName: "证券名称", width: 200 },
];

export default function UploadOrderSection() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

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

  const [buttonStatus, setButtonStatus] = React.useState<ButtonStatus>("");

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
        <StatusButton buttonStatus={buttonStatus} submit={() => {}} />
      </Grid>
      <Grid item xs={12} sx={{ height: 600 }}>
        <DataGrid columns={columns} rows={[]} />
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
  );
}
