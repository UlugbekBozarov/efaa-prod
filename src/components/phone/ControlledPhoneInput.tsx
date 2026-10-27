import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
  Controller,
  type FieldValues,
  type RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { TextField } from "@mui/material";
import { get } from "lodash";
import ErrorInfo from "../error/ErrorInfo";
import { phoneFormatter } from "@/utils";

interface ControlledPhoneInputProps {
  size?: "small" | "medium" | undefined;
  name: string;
  labelKey?: string | undefined;
  focused?: boolean | undefined;
  autoFocus?: boolean | undefined;
  onChange?:
    | ((value: string, oldValue?: string | undefined) => void)
    | undefined;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
}

const ControlledPhoneInput = ({
  size,
  name,
  focused,
  autoFocus,
  labelKey,
  onChange,
  rules = {},
}: ControlledPhoneInputProps) => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  const inputChangeHandler =
    (
      formChangeHandler: (...event: any[]) => void,
      oldValue: string | undefined,
    ) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let value = String(get(event, "target.value", "")).replaceAll(" ", "");

      if (value.length >= 1 && !value.startsWith("+")) {
        value = `+${value}`;
      }

      formChangeHandler(value);
      if (onChange) {
        onChange(value, oldValue);
      }
    };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, ctrlKey, metaKey } = event;

    const alwaysAllowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];

    const isComboKey =
      (ctrlKey || metaKey) &&
      ["a", "c", "v", "x", "z", "y"].includes(key.toLowerCase());

    const isModifierOnly =
      key === "Shift" || key === "Control" || key === "Alt" || key === "Meta";

    if (alwaysAllowedKeys.includes(key) || isComboKey || isModifierOnly) {
      return;
    }

    const isDigit = /^\d$/.test(key);
    const isPlusAllowed =
      key === "+" &&
      !get(event, "currentTarget.value", "").includes("+") &&
      event.currentTarget.selectionStart === 0;

    if (!isDigit && !isPlusAllowed) {
      event.preventDefault();
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { ref, onChange, value, ...field },
        fieldState: { error },
      }) => (
        <Fragment>
          <TextField
            fullWidth
            size={size}
            type="tel"
            focused={focused}
            autoFocus={autoFocus}
            id={`input-${name}`}
            {...field}
            autoComplete={name}
            required={!!get(rules, "required", false)}
            label={labelKey && t(labelKey || "")}
            inputRef={ref}
            error={!!error}
            onChange={inputChangeHandler(onChange, value)}
            value={phoneFormatter(value) || ""}
            onKeyDown={handleKeyDown}
          />
          <ErrorInfo error={error} />
        </Fragment>
      )}
    />
  );
};

export default ControlledPhoneInput;
