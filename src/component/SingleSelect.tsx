import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type Props = {
  placeholder: string;
  options: string[];
  value: string | undefined;
  setValue?: (e: any) => void;
  name?: string;
  disabled?: boolean;
};

export default function SingleSelect(props: Props) {
  const { placeholder, options, value, setValue, name, disabled } = props;

  const handleChange = (event: SelectChangeEvent) => {
    !!setValue && setValue(event.target.value);
  };
  return (
    <FormControl sx={{ width: "100%" }} fullWidth>
      <InputLabel id="select-label">{placeholder}</InputLabel>
      <Select
        labelId="select-label"
        id="single-select"
        label={placeholder}
        value={value}
        name={name}
        onChange={handleChange}
        disabled={!!disabled && disabled}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
