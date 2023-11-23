import React, { useEffect, useState, useCallback, Fragment } from "react";
import { Container, InputAdornment, TextField, Badge, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fontBold, staticFiles } from "../../components/Constants";


export type FooterElement = {
    path: string;
    name: string;
};

const pageLayoutFooter: FooterElement[] = [
    {
      name: "インフルエンサーのみなさまへ",
      path: "/",
    },
    {
      name: "法人のみなさまへ",
      path: "/",
    },
    {
      name: "利用規約(ToS)",
      path: "/",
    },
    {
      name: "プライバシー",
      path: "/",
    },
    {
      name: "安心安全",
      path: "/",
    },
    {
      name: "サポート",
      path: "/",
    },
];

export const Footer = () => {
    const navigate = useNavigate();
    const match_1500 = useMediaQuery('(min-width:1200px)');
    return(
        <div className="w-full px-20 mb-[47px]">
            <div className="flex flex-row">
                <div className="w-[100%]">
                    {pageLayoutFooter.map((data)=>(
                      <Fragment key={data.name}>
                        <button onClick={() => navigate(data.path)} 
                          style={{fontWeight:fontBold}}
                          className={`${match_1500 ? "text-md min-w-[120px]" : "text-ms min-w-[60px]"} font-m1c px-6 mt-3 hover:text-lightBrown/[1]`}>
                            {data.name}
                        </button>
                      </Fragment>
                    ))}
                </div>
                <div className="flex justify-end items-center">
                    <img className="mr-5" src={staticFiles.images.footer} width={33} height={30}/>
                </div>
            </div>
        </div>
    )
}