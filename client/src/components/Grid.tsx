import * as React from 'react';
import Grid from '@mui/material/Grid';
import { staticFiles } from './Constants';

export const HomeGrid = () => {
    return(
<Grid container spacing={2} className='justify-center items-center'>
    {
    Array.from({ length: 10 }).map((_, i) => (
        <Grid item xs="auto" key={i}>
        <img src={staticFiles.images.introduction1} className='w-[252px] mx-6 my-2 rounded-[20px] cursor-pointer image-hover' style={{ background: "white" }}  alt={`Image ${i}`} />
        </Grid>
    ))
    }
  {/* <Grid item xs="auto">
    <img src={staticFiles.images.introduction1} className='w-[252px] rounded-[20px]'/>
  </Grid>
  <Grid item xs="auto">
  <img src={staticFiles.images.introduction1} className='w-[252px] rounded-[20px]'/>
  </Grid>
  <Grid item xs="auto">
  <img src={staticFiles.images.introduction1} className='w-[252px] rounded-[20px]'/>
  </Grid>
  <Grid item xs="auto">
  <img src={staticFiles.images.introduction1} className='w-[252px] rounded-[20px]'/>
  </Grid>
  <Grid item xs="auto">
  <img src={staticFiles.images.introduction1} className='w-[252px] rounded-[20px]'/>
  </Grid> */}
</Grid>
    );
}