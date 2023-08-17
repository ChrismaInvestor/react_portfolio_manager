import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type Props = {
  placeholder: string;
  options: string[];
};

export default function SingleSelect(props: Props) {
  const { placeholder, options } = props;
  return (
    <FormControl sx={{ m: 1, width: "100%" }} fullWidth>
      <InputLabel id="select-label">{placeholder}</InputLabel>
      <Select labelId="select-label" id="single-select" label={placeholder}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
