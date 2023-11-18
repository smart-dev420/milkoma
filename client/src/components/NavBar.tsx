import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useMediaQuery } from "@mui/material";
import { fontBold } from "./Constants";

export type NavBarElement = {
  path: string;
  name: string;
  imgPath: string;
  dropdownElements?: { name: string; subPath: string }[];
};

const itemClass =
  "px-9 py-2 text-xl hover:text-lightBrown/[1] flex justify-center items-center whitespace-nowrap font-m1c ";
const selectedItemClass = "";

const dropdownContainer = "group relative inline-block";

export const NavBar: React.FC<{
  elements: NavBarElement[];
  isMobile?: boolean;
}> = ({ elements, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const match_1200 = useMediaQuery('(min-width:1200px)');

  return (
    <div className={"flex pt-2 justify-center items-center"}>
      {elements.map((el) => (
        <Fragment key={el.name}>
            <button
              className={`${match_1200 ? "text-xl px-9" : "text-ms px-4"} py-2  hover:text-lightBrown/[1] flex justify-center items-center whitespace-nowrap font-m1c`}
              style={{whiteSpace:'nowrap', fontWeight:fontBold}}
              onClick={() => navigate(el.path)}
            ><img className="pr-3" src={el.imgPath}/>
              {el.name}
            </button>
        </Fragment>
      ))}
    </div>
  );
};

export type HashNavBarElement = {
  hash: string;
  name: string;
};
