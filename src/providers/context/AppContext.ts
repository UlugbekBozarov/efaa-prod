import { createContext } from "react";

import type { UseAppType } from "./useApp";

const AppContext = createContext<UseAppType | null>(null);

export default AppContext;
