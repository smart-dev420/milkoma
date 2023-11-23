import React, { useEffect, useState, useCallback, Fragment } from "react";
import { Container, InputAdornment, TextField, Badge, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fontBold, staticFiles } from "../../components/Constants";


export type FooterElement = {
    path: string;
    name: string;
    mRight: string;
};

const pageLayoutFooter: FooterElement[] = [
    {
      name: "インフルエンサーのみなさまへ",
      path: "/",
      mRight: "86px",
    },
    {
      name: "法人のみなさまへ",
      path: "/",
      mRight: "74px",
    },
    {
      name: "利用規約(ToS)",
      path: "/",
      mRight: "58px",
    },
    {
      name: "プライバシー",
      path: "/",
      mRight: "62px",
    },
    {
      name: "安心安全",
      path: "/",
      mRight: "50px",
    },
    {
      name: "サポート",
      path: "/",
      mRight: "0px",
    },
];

export const Footer = () => {
    const navigate = useNavigate();
    const match_1500 = useMediaQuery('(min-width:1200px)');
    return(
        <div className="w-full mb-[47px] px-[155px]">
            <div className="flex flex-row">
                <div className="w-[90%]">
                    {pageLayoutFooter.map((data)=>(
                      <Fragment key={data.name}>
                        <button onClick={() => navigate(data.path)} 
                          style={{fontWeight:fontBold, marginRight:data.mRight, whiteSpace:'nowrap', letterSpacing:'-2px'}}
                          className={`${match_1500 ? "text-[19px]" : "text-[14px] min-w-[60px]"} font-m1c px-6 mt-3 hover:text-lightBrown/[1]`}>
                            {data.name}
                        </button>
                      </Fragment>
                    ))}
                </div>
                <div className="flex items-center justify-end w-[10%] mr-[20px]">
                    <img className="mr-5" src={staticFiles.images.footer} width={33} height={30}/>
                </div>
            </div>
        </div>
    )
}