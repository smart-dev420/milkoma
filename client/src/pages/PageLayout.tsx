import { ReactNode } from "react";
import { Top, Footer } from "./layouts";
import AuthContainer from "./AuthContainer";

export const PageLayout: React.FC<{
  children: ReactNode;
  backgroundColor?: string;
}> = ({ children, backgroundColor = "bg-transparent" }) => (
  <div
    className={`flex flex-col justify-center items-center max-w-[1920px] ${backgroundColor}`}
  >
    <AuthContainer />
    <Top />
    <div className={`w-full ${backgroundColor}`}>
      {children}
    </div>
    <Footer />
  </div>
);
