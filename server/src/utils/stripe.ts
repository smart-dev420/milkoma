import axios from 'axios'
import Stripe from 'stripe'

const stripeBearerToken = process.env.STRIPE_SECRET_KEY;

export const subscribe = async (input: any) => {
  try {
    // const { email, name, method, price, details } = input;
    const contractId = input.contractId;
    const details = input.detail;
    // const headers = {
    //   "Accept": "application/json",
    //   "Content-Type": "application/x-www-form-urlencoded",
    //   "Authorization": "Bearer " + stripeBearerToken
    // };
    // let token = details;    
    // const cardBody = {
    //   "card[number]": details.cardNumber,
    //   "card[exp_month]": details.month,
    //   "card[exp_year]": details.year,
    //   "card[cvc]": details.cvc,
    // }
    
    // const cardToken = await axios.post('https://api.stripe.com/v1/tokens', cardBody, { headers })

    const stripe = require("stripe")(stripeBearerToken);
    // const customer = await stripe.customers.create({
    //   name: details.username,
    //   email: details.email,
    //   });
    // console.log('customer', customer)
    // const card_Token = await stripe.tokens.create({
    //   card: {
    //   name: details.username,
    //   number: '4242424242424242',
    //   exp_month: 12,
    //   exp_year: 2023,
    //   cvc: '314',
    //   },
    //   });
    let paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
      number: '4242424242424242',
      exp_month: 9,
      exp_year: 2022,
      cvc: '314',
      },
      });

    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: 75*100, // USD*100
      currency: 'inr',
      confirm: true,
      payment_method_types: ['card'],
      });
      
    console.log('card_Token', paymentIntent);
    // console.log('token', cardToken);
    //   if (cardToken.status !== 200) {
    //     console.log("Failed in getting tokens in stripe.")
    //     throw Error("Failed in getting tokens in stripe.")
    //   }
    //   const cardData = cardToken.data
    //   token = cardData['id']
    //   console.log(token);

    // const pmBody = {
    //   "type": "card",
    //   "card[token]": token,
    // }
    // const pmToken = await axios.post('https://api.stripe.com/v1/payment_methods', pmBody, { headers })
    // if (pmToken.status != 200) {
    //   throw Error('Failed in getting payment_methods in stripe.')
    // }
    // const pmData = pmToken.data

    // const customerBody = {
    //   "description": "Subscribe Neopen Private Server",
    //   "payment_method": pmData['id'],
    //   "invoice_settings[default_payment_method]": pmData['id'],
    //   "email": email,
    //   "name": name,
    // }
    // const customerToken = await axios.post('https://api.stripe.com/v1/customers', customerBody, { headers })
    // if (customerToken.status != 200) {
    //   throw Error('Failed in getting customers in stripe.')
    // }
    // const customerData = customerToken.data
    // const customerID = customerData['id']

    // const subPrice = price;
    // const subscribeBody = {
    //   "customer": customerID,
    //   "items[0][price]": subPrice,
    // }
    // const subscriptionToken = await axios.post('https://api.stripe.com/v1/subscriptions', subscribeBody, { headers })
    // if (subscriptionToken.status != 200) {
    //   throw Error('Failed in subscribing with current customer in stripe.')
    // }
    // const subscriptionData = subscriptionToken.data
    // return {
    //   subscriptionId: subscriptionData['id'],
    //   customerID: customerID,
    // }
  } catch (error: any) {
    console.log(error)
    throw error
  }
}

export const subscribeWithCustomerID = async (input: any) => {
  try {
    const { customerID, price } = input

    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Bearer " + stripeBearerToken
    };

    const subPrice = price;
    const subscribeBody = {
      "customer": customerID,
      "items[0][price]": subPrice,
    }
    const subscriptionToken = await axios.post('https://api.stripe.com/v1/subscriptions', subscribeBody, { headers })
    if (subscriptionToken.status != 200) {
      throw Error('Failed in subscribing with current customer in stripe.')
    }
    const subscriptionData = subscriptionToken.data

    return { subscriptionId: subscriptionData['id'] }

  } catch (error: any) {
    console.log(error)
    throw error
  }
}

export const unSubscribeWithSubscriptionId = async (input: any) => {
  try {
    const { subscriptionId } = input
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Bearer " + stripeBearerToken
    };

    const unSubscriptionToken = await axios.delete(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, { headers })
    if (unSubscriptionToken.status != 200) {
      throw Error('Failed in unSubscribing with current subscriptionId in stripe.')
    }
    return unSubscriptionToken.data['id']
  } catch (error: any) {
    console.log(error)
    throw error
  }
}
