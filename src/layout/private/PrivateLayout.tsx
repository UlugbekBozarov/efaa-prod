import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, List, ListItem, Stack } from "@mui/material";

import { Home, Logo } from "@/assets";
import { useConfig } from "@/hooks";

import PrivateLayoutFullScreen from "./fullScreen/PrivateLayoutFullScreen";
import PrivateLayoutLogout from "./logout/PrivateLayoutLogout";
import { SidebarItem } from "./PrivateLayout.style";

const sides = [
  {
    id: "home",
    path: "/",
    titleKey: "Sale",
    icon: <Home />,
  },
];

const PrivateLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isOnline } = useConfig();
  // const [syncOpen, setSyncOpen] = useState<boolean>(false);

  // const handleSyncOpen = () => {
  //   setSyncOpen(true);
  // };
  // const handleSyncClose = () => {
  //   setSyncOpen(false);
  // };

  const handleChangePath = (path: string) => () => {
    navigate(path);
  };

  // useEffect(() => {
  //   const init = async () => {
  //     await initDb({
  //       version: 1,
  //       forceReInit: false,
  //     });
  //     await useAppStore.getState().initializing();
  //     await useAppStore.getState().backendSync();
  //   };

  //   init();
  // }, []);

  // if (initialized) {
  //   return <FallbackSuspense loadingTextKey="Initializing store..." />;
  // }

  // if (initialLoading) {
  //   return (
  //     <FallbackSuspense
  //       loadingTextKey={get(initialProgress, "section", "Loading...")}
  //       value={get(initialProgress, "value", 0)}
  //     />
  //   );
  // }

  return (
    // <Box>Private Layout {<Outlet />}</Box>
    <Box sx={{ width: "100%", height: "100vh", display: "flex" }}>
      <Box
        component="aside"
        sx={{
          position: "relative",
          width: "60px",
          bgcolor: "background.paper",
          "&::after": {
            content: '""',
            position: "absolute",
            width: "10px",
            height: "100%",
            top: 0,
            right: "-9px",
            backgroundColor: "primary.main",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
          },
        }}
      >
        <Stack
          sx={{
            height: "100%",
            direction: "column",
            justifyContent: "space-between",
          }}
        >
          <Box component="nav">
            <List>
              <ListItem disablePadding>
                <Box
                  sx={{
                    width: "100%",
                    height: "70px",
                    padding: "10px 5px 10px",
                    color: isOnline ? "primary.main" : "text.secondary",
                  }}
                >
                  <Logo />
                </Box>
              </ListItem>
              {sides.map(({ id, path, icon }) => {
                const active = path === pathname;
                return (
                  <ListItem
                    sx={{ p: active ? "7px 0px 7px 10px" : "7px 4px 7px 5px" }}
                    key={id}
                  >
                    <SidebarItem
                      onClick={handleChangePath(path)}
                      active={active}
                    >
                      {icon}
                    </SidebarItem>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box sx={{ paddingBottom: "20px" }}>
            <List>
              {[
                {
                  key: "fullScreen",
                  component: <PrivateLayoutFullScreen />,
                },
                // {
                //   key: "mode",
                //   component: <PrivateLayoutMode />,
                // },
                {
                  key: "logout",
                  component: <PrivateLayoutLogout />,
                },
              ].map(({ key, component }) => (
                <ListItem sx={{ p: "7px 4px 7px 5px" }} key={key}>
                  {component}
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </Box>
      <Box
        component="main"
        sx={{
          width: "calc(100% - 60px)",
          height: "100%",
          bgcolor: "background.default",
          paddingLeft: "20px",
        }}
      >
        <Outlet
        // context={{ syncOpen: syncOpen }}
        />
      </Box>
      {/* <QueueDrawer open={syncOpen} onClose={handleSyncClose} /> */}
    </Box>
  );
};

export default PrivateLayout;
