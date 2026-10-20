import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { get } from "lodash";

import {
  ControlledCheckbox,
  ControlledInput,
  ControlledPhoneInput,
} from "@/components";
import { Info, Logo, Visibility, VisibilityOff } from "@/assets";
import { useAppStore } from "@/store/app.store";
import { useGlobalContext } from "@/hooks";
import type { IUser } from "@/store/user";
import { apiFetch } from "@/api/fetch/apiFetch";

const formNames = {
  username: "username",
  password: "password",
  rememberMe: "rememberMe",
};

const AuthSignIn = () => {
  const { t } = useTranslation();

  const host = window.location.hostname;
  const baseHost = host.replace(/^pos\./, "");
  const forgotUrl = `${window.location.protocol}//${baseHost}/forgot-password`;

  const {
    actions: { setAuthenticated },
  } = useGlobalContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [blockedMessage, setBlockedMessage] = useState<string | undefined>();

  const formStore = useForm({
    defaultValues: {
      [formNames.username]: "",
      [formNames.password]: "",
      [formNames.rememberMe]: true,
    },
  });
  const { setError, handleSubmit } = formStore;

  const handleChangeVisibility = () => {
    setVisible((prev) => !prev);
  };

  const submitHandler = handleSubmit(async (data) => {
    await setLoading(true);
    try {
      await apiFetch<IUser>("auth/sign-in", {
        method: "POST",
        body: {
          [formNames.username]: get(data, formNames.username),
          [formNames.password]: get(data, formNames.password),
          [formNames.rememberMe]: get(data, formNames.rememberMe, false),
        },
      })
        .then(async (response) => {
          localStorage.setItem("deviceId", get(response, "deviceId", ""));
          localStorage.setItem("deviceName", get(response, "deviceName", ""));
          await useAppStore.getState().userSet(response);
          await setAuthenticated(true);
        })
        .catch((error) => {
          if (get(error, "statusCodeValue") === 406) {
            setBlockedMessage(get(error, "message"));
          } else if (get(error, "statusCodeValue") === 400) {
            Object.entries(get(error, "body", {})).forEach(([keyBy, value]) => {
              setError(keyBy, {
                message: t(get(value, "message", "")),
                type: "onChange",
              });
            });
          }
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log("Submit error: ", error);
    }
  });

  return (
    <Box maxWidth="400px" p="14px">
      <form onSubmit={submitHandler}>
        <Box display="flex" justifyContent="center">
          <Box width="100px" height="100px" color="primary.main">
            <Logo />
          </Box>
        </Box>
        <Typography variant="h4" fontWeight={700}>
          {t("Hi, Welcome back!")}
        </Typography>
        <Typography color="text.secondary" mb="20px">
          {t("Glad to see you again.")}
        </Typography>

        <FormProvider {...formStore}>
          <Grid container rowSpacing="24px" columnSpacing="16px" mb="20px">
            <Grid size={12}>
              <Typography variant="h6" fontWeight="bold" mb="5px">
                {t("Sign in to your account")}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {t("Don’t have an account?")}&nbsp;
                <Link target="_blank" to="https://efaa.me">
                  {t("Get started")}
                </Link>
              </Typography>
            </Grid>
            <Grid size={12}>
              <Collapse in={!!blockedMessage}>
                <Alert severity="error" icon={<Info />}>
                  <Typography fontSize="14px" color="error.dark">
                    {t(blockedMessage || "")}
                  </Typography>
                </Alert>
              </Collapse>
            </Grid>
            <Grid size={12}>
              <ControlledPhoneInput
                autoFocus
                labelKey="Phone number"
                name={formNames.username}
                rules={{
                  required: true,
                  minLength: {
                    value: 9,
                    message: t("Minimum length", {
                      value: 9,
                    }),
                  },
                }}
              />
            </Grid>
            <Grid size={12}>
              <ControlledInput
                type={visible ? "text" : "password"}
                labelKey="Password"
                disabled={loading}
                name={formNames.password}
                endAdornment={
                  <IconButton onClick={handleChangeVisibility}>
                    {visible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                }
                rules={{
                  required: true,
                  minLength: {
                    value: 6,
                    message: t("Minimum length", {
                      value: 6,
                    }),
                  },
                }}
              />
            </Grid>
            <Grid size={12} display="flex" justifyContent="flex-end">
              <Link to={forgotUrl}>{t("Forgot password?")}</Link>
            </Grid>
            <Grid size={12}>
              <ControlledCheckbox
                disabled={loading}
                labelKey="Remember me"
                name={formNames.rememberMe}
              />
            </Grid>
          </Grid>
        </FormProvider>
        <Box>
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress size="16px" color="inherit" />
              ) : undefined
            }
          >
            {t("Sign in")}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AuthSignIn;
