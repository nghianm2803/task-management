import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";

interface FSelectProps {
  name: string;
  children: React.ReactNode;
  onChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

function FSelect({ name, children, ...other }: FSelectProps) {
  const { control } = useForm();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}

export default FSelect;
