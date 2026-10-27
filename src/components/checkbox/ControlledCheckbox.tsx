import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form";
import { FormControlLabel } from "@mui/material";

import CustomCheckbox from "./CustomCheckbox";
import ErrorInfo from "../error/ErrorInfo";

interface ControlledCheckboxProps {
  labelKey?: string;
  name: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  onChange?: ((checked: boolean) => void) | undefined;
  labelPlacement?: "top" | "bottom" | "end" | "start" | undefined;
  disabled?: boolean | undefined;
}

const ControlledCheckbox = ({
  labelKey = "",
  name,
  rules,
  onChange,
  ...props
}: ControlledCheckboxProps) => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  const checkboxChangeHandle =
    (formChangeHandler: (...event: any[]) => void) =>
    (event: React.SyntheticEvent, checked: boolean) => {
      formChangeHandler(checked);
      if (onChange) {
        onChange(checked);
      }
    };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { ref, onChange, ...field },
        fieldState: { error },
      }) => (
        <Fragment>
          <FormControlLabel
            label={t(labelKey)}
            {...props}
            {...field}
            ref={ref}
            onChange={checkboxChangeHandle(onChange)}
            value={field?.value || false}
            checked={field?.value || false}
            control={<CustomCheckbox id={name} />}
          />
          <ErrorInfo error={error} />
        </Fragment>
      )}
    />
  );
};

export default ControlledCheckbox;
