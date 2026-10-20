// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import {
  Outlet,
  // useLocation,
  // useNavigate
} from "react-router-dom";
// import {
//   Box,
//   List,
//   ListItem,
//   ListItemButton,
//   Stack,
//   Typography,
// } from "@mui/material";
// import { get } from "lodash";

// import { Crm, Finance, Home, Logo, Product, Sale } from "@/assets";
// import QueueDrawer from "@/pages/queue/QueueDrawer";
// import { useAppStore } from "@/store/app.store";
// import { FallbackSuspense } from "@/components";
// import { initDb } from "@/store/initDb";
// import { useConfig } from "@/hooks";

// import PrivateLayoutFullScreen from "./fullScreen/PrivateLayoutFullScreen";
// import { DeviceNameWrapper, SidebarItem } from "./PrivateLayout.style";
// import PrivateLayoutLogout from "./logout/PrivateLayoutLogout";

// const sides = [
//   {
//     id: "home",
//     path: "/",
//     titleKey: "Sale",
//     icon: <Home />,
//   },
//   // {
//   //   id: "return",
//   //   path: "/return",
//   //   titleKey: "Return",
//   //   icon: <Return />,
//   // },
//   {
//     id: "sales",
//     path: "/sales",
//     titleKey: "Sales",
//     icon: <Sale />,
//   },
//   {
//     id: "customers",
//     path: "/customers",
//     titleKey: "Customers",
//     icon: <Crm />,
//   },
//   {
//     id: "products",
//     path: "/products",
//     titleKey: "Products",
//     icon: <Product />,
//   },
//   {
//     id: "finance",
//     path: "/finance",
//     titleKey: "Finance",
//     icon: <Finance />,
//   },
//   // {
//   //   id: "settings",
//   //   path: "/settings",
//   //   titleKey: "Settings",
//   //   icon: <Settings />,
//   // },
// ];

const PrivateLayout = () => {
  // const { t } = useTranslation();

  // const navigate = useNavigate();
  // const { pathname } = useLocation();

  // const { initialized, initialLoading, initialProgress, isOnline, device } =
  //   useConfig();
  // const [syncOpen, setSyncOpen] = useState<boolean>(false);

  // const handleSyncOpen = () => {
  //   setSyncOpen(true);
  // };
  // const handleSyncClose = () => {
  //   setSyncOpen(false);
  // };

  // const handleChangePath = (path: string) => () => {
  //   navigate(path);
  // };

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
    <Box>Private Layout {<Outlet />}</Box>
    // <Box width="100%" height="100vh" display="flex">
    //   <Box
    //     position="relative"
    //     component="aside"
    //     width="60px"
    //     bgcolor="background.paper"
    //     sx={{
    //       "&::after": {
    //         content: '""',
    //         position: "absolute",
    //         width: "10px",
    //         height: "100%",
    //         top: 0,
    //         right: "-9px",
    //         backgroundColor: "primary.main",
    //         borderTopRightRadius: "8px",
    //         borderBottomRightRadius: "8px",
    //       },
    //     }}
    //   >
    //     <Stack height="100%" direction="column" justifyContent="space-between">
    //       <Box component="nav">
    //         <List>
    //           <ListItem disablePadding>
    //             <Box
    //               width="100%"
    //               p="10px 5px 10px"
    //               color={isOnline ? "primary.main" : "text.secondary"}
    //             >
    //               <ListItemButton
    //                 onClick={handleSyncOpen}
    //                 title={t("Efaa - sync data")}
    //                 sx={(theme) => ({
    //                   height: "50px",
    //                   padding: "0px",
    //                   borderRadius: `${get(theme, "shape.borderRadius")}px`,
    //                 })}
    //               >
    //                 <Logo />
    //               </ListItemButton>
    //             </Box>
    //           </ListItem>
    //           {sides.map(({ id, path, icon }) => {
    //             const active = path === pathname;
    //             return (
    //               <ListItem
    //                 sx={{ p: active ? "7px 0px 7px 10px" : "7px 4px 7px 5px" }}
    //                 key={id}
    //               >
    //                 <SidebarItem
    //                   onClick={handleChangePath(path)}
    //                   active={active}
    //                 >
    //                   {icon}
    //                 </SidebarItem>
    //               </ListItem>
    //             );
    //           })}
    //         </List>
    //       </Box>
    //       <Box pb="20px">
    //         <List>
    //           {[
    //             {
    //               key: "fullScreen",
    //               component: <PrivateLayoutFullScreen />,
    //             },
    //             // {
    //             //   key: "mode",
    //             //   component: <PrivateLayoutMode />,
    //             // },
    //             {
    //               key: "logout",
    //               component: <PrivateLayoutLogout />,
    //             },
    //           ].map(({ key, component }) => (
    //             <ListItem sx={{ p: "7px 4px 7px 5px" }} key={key}>
    //               {component}
    //             </ListItem>
    //           ))}
    //         </List>
    //       </Box>
    //     </Stack>
    //     <DeviceNameWrapper>
    //       <Typography
    //         fontSize="12px"
    //         lineHeight="12px"
    //         fontWeight="bold"
    //         color="primary.contrastText"
    //       >
    //         {get(device, "name")}
    //       </Typography>
    //     </DeviceNameWrapper>
    //   </Box>
    //   <Box
    //     component="main"
    //     width="calc(100% - 60px)"
    //     height="100%"
    //     bgcolor="background.default"
    //     pl="20px"
    //   >
    //     <Outlet context={{ syncOpen: syncOpen }} />
    //   </Box>
    //   <QueueDrawer open={syncOpen} onClose={handleSyncClose} />
    // </Box>
  );
};

export default PrivateLayout;
