import { ReactNode } from "react";
import { Top, Footer } from "./layouts";
import { staticFiles } from "../components/Constants";
import { SideBar } from "./layouts/SideBar";
import AuthContainer from "./AuthContainer";

export const MypageLayout: React.FC<{
  children: ReactNode;
  backgroundColor?: string;
}> = ({ children, backgroundColor = "bg-transparent" }) => (
  <div
    className={`flex flex-col justify-center items-center max-w-[1920px] ${backgroundColor}`}
  >
    <AuthContainer />
    <Top />
    <div className={`w-full flex flex-row ${backgroundColor}`}>
        <img src={staticFiles.images.ellipse_left} className="w-[250px]" style={{position:"fixed", left:0, top:-80}}/>
        <SideBar />
        <div className="ml-[350px] mt-[220px] mb-[100px] w-[100%]">
          {children}
        </div>
    </div>
    <Footer />
  </div>
);
