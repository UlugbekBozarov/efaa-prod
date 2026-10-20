import { Fragment, type ReactNode } from "react";
// import { Toaster } from "react-hot-toast";

interface ToastProviderProps {
  children?: ReactNode | undefined;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <Fragment>
      {children}
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
    </Fragment>
  );
};

export default ToastProvider;
