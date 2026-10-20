import { IconButton } from "@mui/material";

import { Moon, Sun } from "@/assets";
import { useConfig } from "@/hooks";

const PrivateLayoutMode = () => {
  const { mode, onChangeMode } = useConfig();

  return (
    <IconButton size="large" onClick={onChangeMode}>
      {mode === "light" ? <Moon /> : <Sun />}
    </IconButton>
  );
};

export default PrivateLayoutMode;
