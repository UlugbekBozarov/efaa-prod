import { Fragment, type JSX } from "react";
import { useTranslation } from "react-i18next";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form";
import { TextField } from "@mui/material";
import { get } from "lodash";

import ErrorInfo from "../error/ErrorInfo";

interface ControlledInputProps {
  multiline?: boolean | undefined;
  labelKey?: string | undefined;
  name: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined
    | undefined;
  disabled?: boolean;
  autoFocus?: boolean;
  type?: "tel" | "text" | "password" | "number" | undefined;
  onChange?: (value: string) => void | undefined;
  endAdornment?: JSX.Element | undefined;
  placeholder?: string | undefined;
  size?: "small" | "medium" | undefined;
}

const ControlledInput = ({
  labelKey,
  name = "custom-input",
  endAdornment,
  rules = {},
  onChange,
  ...props
}: ControlledInputProps) => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  const inputChangeHandler =
    (formChangeHandler: (...event: any[]) => void) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      formChangeHandler(get(event, "target.value", ""));
      if (onChange) {
        onChange(get(event, "target.value", ""));
      }
    };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      disabled={get(props, "disabled")}
      render={({
        field: { ref, onChange, ...field },
        fieldState: { error },
      }) => (
        <Fragment>
          <TextField
            id={`input-${name}`}
            fullWidth
            {...props}
            {...field}
            autoComplete={name}
            label={labelKey && t(labelKey)}
            inputRef={ref}
            error={!!error}
            value={field?.value || ""}
            onChange={inputChangeHandler(onChange)}
            slotProps={{
              input: {
                endAdornment: endAdornment,
              },
            }}
          />
          <ErrorInfo error={error} />
        </Fragment>
      )}
    />
  );
};

export default ControlledInput;
