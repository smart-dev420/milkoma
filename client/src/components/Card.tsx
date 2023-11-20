import { Fragment, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Card, Grid, useMediaQuery } from "@mui/material";
import { fontBold, staticFiles } from "./Constants";

export type CardElement = {
    name: string;
    description: string;
    imagePath: string;
    buttonName: string;
  };

export const IntroCard: React.FC<{
    elements: CardElement[];
    space: number;
  }> = ({ elements, space }) => {
    const match_768 = useMediaQuery('(min-width:768px)');
    const navigate = useNavigate();
    return(
      <div className={`${match_768 ? "flex-row" : "flex-col"} flex mx-10 justify-evenly items-center `}>
        <Grid container spacing={space} className='justify-center'>
          {elements.map((el) => (
            <Grid item xs="auto" key={el.name} > 
              <div className={` w-[318px] mx-[28px] bg-cover bg-center justify-between card-aspect rounded-[20px] card-padding`} style={{backgroundImage: `url(${el.imagePath})`}}>
                <div className="card-content p-5">
                <label className="font-m1c text-xl font-medium " style={{fontWeight:fontBold, textAlign:'center'}}>{el.name}</label>
                <p className="mt-1 text-ms">{el.description}</p>
                <button onClick={() => {navigate('/direct_request')}} className="w-full h-[41px] mt-4 rounded-[27px] btn-color" style={{fontWeight:fontBold}}>{el.buttonName}</button>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
        </div>
    );
}