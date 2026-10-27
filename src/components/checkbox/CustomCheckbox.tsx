import { Checkbox, type CheckboxProps } from "@mui/material";

import {
  CheckboxChecked,
  Checkbox as CheckboxIcon,
  CheckIndeterminate,
} from "@/assets";

const CustomCheckbox = (props: CheckboxProps) => {
  return (
    <Checkbox
      icon={<CheckboxIcon />}
      checkedIcon={<CheckboxChecked />}
      indeterminateIcon={<CheckIndeterminate />}
      {...props}
    />
  );
};

export default CustomCheckbox;
