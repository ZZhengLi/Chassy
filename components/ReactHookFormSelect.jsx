// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import Select from "@material-ui/core/Select";
import { FormControl, InputLabel,Select } from "@mui/material";
import { Controller } from "react-hook-form";

const ReactHookFormSelect = ({
  name,
  label,
  control,
  defaultValue,
  children,
  ...props
}) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        as={
          <Select labelId={labelId} label={label}>
            {children}
          </Select>
        }
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};
export default ReactHookFormSelect;
