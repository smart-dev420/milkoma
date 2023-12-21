// import { btnBackground, btnBackgroundHover, fontBold, staticFiles } from "../../components/Constants";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { API } from "../../axios";
// import { getDateString, headers } from "../../utils/appHelper";
// import { useDispatch } from "react-redux";
// import { Box, Button, Card, CardMedia, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, Icon, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material"
// import { toast } from "react-toastify";
// import {
//     CardNumberElement,
//     CardExpiryElement,
//     CardCvcElement,
//     useStripe, 
//     useElements
//   } from "@stripe/react-stripe-js";
// import Stripe from "react-stripe-checkout"

// export const TestPayment = () => {
//     const navigate = useNavigate();
//     const { cid } = useParams();
//     const contractId = cid??'';

//     const stripe = useStripe();
//     const elements = useElements();
  
//     const handlePayment = async (event: any) => {
  
//       try {
//         // Make a POST request to your backend to get the client_secret
//         const response = await axios.post(
//             `${API}/api/stripe_payment/${contractId}`,
//           { amount: 20000 }, headers()
//         );
//             console.log('response - ', response);
//         // if (response.status === 200) {
//         //     const cardElement = elements?.getElement(CardNumberElement);

//         //     if (!cardElement) {
//         //       // Handle the case where the card element is not available or undefined
//         //       console.error('Card element is not available');
//         //       return; // Or perform appropriate error handling
//         //     }
            
//         //     // Now you can proceed to use the card element
//         //     const confirmPayment = await stripe?.confirmCardPayment(
//         //       response.data.client_secret,
//         //       {
//         //         payment_method: {
//         //           card: cardElement,
//         //         },
//         //       }
//         //     );
  
//         //   if (confirmPayment?.paymentIntent?.status === 'succeeded') {
//         //     console.log('Payment confirmed!');
//         //     // Handle successful payment here
//         //   } else if (confirmPayment?.paymentIntent?.status === 'requires_action') {
//         //     // Handle additional authentication steps if required
//         //     // For example, use confirmCardPayment with the handleCardAction option
//         //   } else {
//         //     console.log('Payment failed!');
//         //     // Handle payment failure or other statuses here
//         //   }
//         // }
//       } catch (error) {
//         console.error('Error processing payment:', error);
//         // Handle error scenarios here
//       }
//     };

//     const handleToken = async (totalAmount: number, token: any) => {
//       try{
//         const query = `${API}/api/stripe_payment/${contractId}`;
//         const res = await axios.post(query, {token: token.id, amount: totalAmount}, headers());
//         console.log('res - ', res);
//       }catch(err){
//         console.log(err)
//       }
//     }

//     const tokenHandler = (token: any) => {
//       handleToken(100, token);
//     }

//     return(

//             // <form>
//             // <CardNumberElement/>
//             // <CardExpiryElement />
//             // <CardCvcElement />    
//             // <button onClick={handlePayment}>Confirm Payment</button>
//             // </form>
//       <div>
//         <Stripe
//         locale="ja" 
//         stripeKey="pk_test_51L0i70J9gsB8v3ioEZ100YCmxVcelkpsnM1ZcM9rbHYud3zLEq6A5VFdXcKyn7LU9oIEAWrfqqSYazpfOOGfxuUt00qYe45aRg"
//         token={tokenHandler}
//         />
//       </div>
//     )
// }

import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
// import Iconify from 'src/components/iconify';
// import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from 'src/assets/icons';
import { CardProps } from '@mui/material/Card';
import StripeCheckout from 'react-stripe-checkout';

// Extend the Window interface to include the paypal property
interface CustomWindow extends Window {
  paypal?: any;
}

type Props = CardProps & {
  index: number;
  card: {
    subscription: string;
    priceMonth: number;
    priceYearly: number;
    caption: string;
    labelAction: string;
    lists: string[];
  };
  isOn: boolean;
};

export default function PricingCard({ card, isOn, index, sx, ...other }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [purchasevalue, setPurchasevalue] = useState("");
  // const [openPaypalModal, setOpenPaypalModal] = useState(false);
  const { subscription, priceMonth, priceYearly, caption, lists, labelAction } = card;

  const free = subscription === 'free';
  const basic = subscription === 'basic';
  const premium = subscription === 'premium';
  const corporate = subscription === 'corporate';
  // let prchsvalue = "";
  const handleOpenModal = (innerText: string) => {
    if(innerText === "Choose basic"){
      const newval = document.getElementById("149val");
      if (newval !== null) {
        const takenew = newval.innerText;
        if(takenew === "14.9"){
          // prchsvalue = 14.9;
          setPurchasevalue("1490");
        }
        else{
          // prchsvalue = 149;
          setPurchasevalue("14900");
        }
      }
    }
    if(innerText === "Choose premium"){
      const newval = document.getElementById("409val");
      if (newval !== null){
        const takenew = newval.innerText;
        if(takenew === "39.9"){
          setPurchasevalue("3990");
        }
        else{
          setPurchasevalue("40900");
        }
      }
    }
    if(innerText === "Choose corporate"){
      const newval = document.getElementById("500val");
      if (newval !== null){
        const takenew = newval.innerText;
        setPurchasevalue("50000");
      }
    }
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  // const handleOpenPaypalModal = (checking: string) => {
  //   setOpenModal(false);
  //   setOpenPaypalModal(true);
  //   if(checking === "paypalclicked"){
  //     const getpaypal = document.getElementById("149paypalmd");
  //     const showpaypal = document.getElementById("149ppl");
  //     showpaypal.innerHTML = getpaypal.innerHTML;
  //     console.log(getpaypal.innerHTML);
  //   }
  //   // const getpaypal = document.getElementById("149paypalmd");
  //   // const showpaypal = document.getElementById("getpaypal");
  //   // console.log(showpaypal.innerText);
  //   // if (getpaypal && showpaypal) {
  //   //   console.log("I'm here");
  //   //   showpaypal.innerHTML = getpaypal.innerHTML;
  //   // }
  // }
  // const handleClosePaypalModal = () => {
  //   setOpenPaypalModal(false);
  // }
  const showstripebtn = () => {
    const stripebtn = document.getElementById("stripebtn");
    if (stripebtn !== null){
      stripebtn.style.display = "block";
    }
  }
  const renderIcon = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Box sx={{ width: 48, height: 48 }}>
        {free && <></>}
        {basic && 'Basic'}
        {premium && 'Premium'}
        {corporate && 'Corporate'}
      </Box>

      {basic && <Typography color="info">POPULAR</Typography>}
    </Stack>
  );

  // render subscription

  const renderSubscription = (
    <Stack spacing={1}>
      <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
        {subscription}
      </Typography>
      <Typography variant="subtitle2">{caption}</Typography>
    </Stack>
  );

  const renderPrice = free ? (
    <Typography variant="h2">Free</Typography>
  ) : (
    <Stack direction="row">
      <Typography variant="h4">€</Typography>
      {/* <div id={`${priceYearly}paypalmd`}>
        <div ref={paypal} />
      </div> */}
      <Typography variant="h2" id={`${priceYearly}val`}>{isOn ? priceYearly : priceMonth}</Typography>

      {basic || premium ? (
        <Typography
          component="span"
          sx={{
            alignSelf: 'center',
            color: 'text.disabled',
            ml: 1,
            typography: 'body2',
          }}
        >
          {isOn ? '/yr' : '/mo'}
        </Typography>
      ) : (
        <></>
      )}
    </Stack>
  );

  // render list

  const renderList = (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="center">
        {/* <Box component="span" sx={{ typography: 'overline' }}>
          Features
        </Box> */}
        <Link variant="body2" color="inherit" underline="always" href="/plans/overview">
        Features
        </Link>
      </Stack>

      {lists.map((item) => (
        <Stack
          key={item}
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{
            typography: 'body2',
          }}
        >
        {/* <Iconify icon="eva:checkmark-fill" width={16} sx={{ mr: 1 }} /> */}
          {item}
        </Stack>
      ))}
    </Stack>
  );

  const onToken = (token: any) =>{
    console.log(token);
  }
  return (
    <Stack
      spacing={5}
      // sx={{
      //   p: 5,
      //   borderRadius: 2,
      //   boxShadow: (theme) => ({
      //     xs: theme.customShadows.card,
      //   }),
      //   ...sx,
      // }}
      {...other}
    >
      {renderIcon}

      {renderSubscription}

      {renderPrice}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderList}

        <Button fullWidth size="large" variant="contained" disabled={free} onClick={() => handleOpenModal(labelAction)}>
          {labelAction}
        </Button>

      {/* Paypal Modal  */}
      {/* <Dialog open={openPaypalModal} onClose={handleClosePaypalModal}>
        <DialogTitle>Paypal Payment</DialogTitle>
        <DialogContent>
          <div id={`${priceYearly}ppl`}> </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaypalModal}>Close</Button>
        </DialogActions>
      </Dialog> */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Payment Integrations</DialogTitle>
        <DialogContent>
          <Typography variant="body1">To buy this subscription you need to pay using either paypal or stripe...</Typography>
          <br />
          <br />
          <Link href="/plans/paypal"><Button fullWidth size="large" variant="contained" style={{width:"70%", marginLeft: "15%"}}>
          Choose Paypal
          </Button></Link>
          <br />
          <br />
          <Button fullWidth size="large" variant="contained" onClick={showstripebtn} style={{width:"70%", marginLeft: "15%"}}>
          Choose Stripe
          </Button>
          <br />
          <br />
          <div style={{marginLeft: "38%", display: "none"}} id="stripebtn">
          <StripeCheckout
            token={onToken}
            name="ReACT Application"
            currency="USD"
            amount={parseFloat(purchasevalue)}
            stripeKey="pk_test_51Mzkp7ITuIlz575ivol6fzkYduTdDKHgAudxugxaqn8N8AM1h0qcmw95rivH5HWXNeyToz5kEzdcC4ntnPss05yF00bpwqr8mC"
          />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
