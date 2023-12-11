import axios from 'axios'

const stripeBearerToken = process.env.STRIPE_SECRET_KEY;
const price30 = process.env.SUBSCRIBE_PRICE_NEOPEN_30;
const price55 = process.env.SUBSCRIBE_PRICE_NEOPEN_55;
const price75 = process.env.SUBSCRIBE_PRICE_NEOPEN_75;
const price100 = process.env.SUBSCRIBE_PRICE_NEOPEN_100;
const price125 = process.env.SUBSCRIBE_PRICE_NEOPEN_125;
const price150 = process.env.SUBSCRIBE_PRICE_NEOPEN_150;
const price175 = process.env.SUBSCRIBE_PRICE_NEOPEN_175;
const price200 = process.env.SUBSCRIBE_PRICE_NEOPEN_200;
const price225 = process.env.SUBSCRIBE_PRICE_NEOPEN_225;
const price250 = process.env.SUBSCRIBE_PRICE_NEOPEN_250;
const price275 = process.env.SUBSCRIBE_PRICE_NEOPEN_275;
const price300 = process.env.SUBSCRIBE_PRICE_NEOPEN_300;
const price325 = process.env.SUBSCRIBE_PRICE_NEOPEN_325;
const price350 = process.env.SUBSCRIBE_PRICE_NEOPEN_350;
const price375 = process.env.SUBSCRIBE_PRICE_NEOPEN_375;
const price400 = process.env.SUBSCRIBE_PRICE_NEOPEN_400;
const price425 = process.env.SUBSCRIBE_PRICE_NEOPEN_425;
const price450 = process.env.SUBSCRIBE_PRICE_NEOPEN_450;
const price475 = process.env.SUBSCRIBE_PRICE_NEOPEN_475;
const price500 = process.env.SUBSCRIBE_PRICE_NEOPEN_500;
const price525 = process.env.SUBSCRIBE_PRICE_NEOPEN_525;
const price550 = process.env.SUBSCRIBE_PRICE_NEOPEN_550;
const price575 = process.env.SUBSCRIBE_PRICE_NEOPEN_575;
const price600 = process.env.SUBSCRIBE_PRICE_NEOPEN_600;
const price625 = process.env.SUBSCRIBE_PRICE_NEOPEN_625;
const price650 = process.env.SUBSCRIBE_PRICE_NEOPEN_650;
const price675 = process.env.SUBSCRIBE_PRICE_NEOPEN_675;
const price700 = process.env.SUBSCRIBE_PRICE_NEOPEN_700;
const price725 = process.env.SUBSCRIBE_PRICE_NEOPEN_725;
const price750 = process.env.SUBSCRIBE_PRICE_NEOPEN_750;
const price775 = process.env.SUBSCRIBE_PRICE_NEOPEN_775;
const price800 = process.env.SUBSCRIBE_PRICE_NEOPEN_800;
const price825 = process.env.SUBSCRIBE_PRICE_NEOPEN_825;
const price850 = process.env.SUBSCRIBE_PRICE_NEOPEN_850;
const price875 = process.env.SUBSCRIBE_PRICE_NEOPEN_875;
const price900 = process.env.SUBSCRIBE_PRICE_NEOPEN_900;
const price925 = process.env.SUBSCRIBE_PRICE_NEOPEN_925;
const price950 = process.env.SUBSCRIBE_PRICE_NEOPEN_950;
const price975 = process.env.SUBSCRIBE_PRICE_NEOPEN_975;
const price1000 = process.env.SUBSCRIBE_PRICE_NEOPEN_1000;
const price999 = process.env.SUBSCRIBE_PRICE_ADVISOR_999;

export const subscribe = async (input: any) => {
  try {
    const { email, name, method, price, details } = input;
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Bearer " + stripeBearerToken
    };
    let token = details       //If GPay payment 'gpay'
      const { cardNumber, expiredYear, expiredMonth, ccv } = JSON.parse(details)
      const cardBody = {
        "card[number]": cardNumber,
        "card[exp_month]": expiredMonth,
        "card[exp_year]": expiredYear,
        "card[cvc]": ccv,
      }

      const cardToken = await axios.post('https://api.stripe.com/v1/tokens', cardBody, { headers })

      if (cardToken.status !== 200) {
        console.log("Failed in getting tokens in stripe.")
        throw Error("Failed in getting tokens in stripe.")
      }
      const cardData = cardToken.data
      token = cardData['id']
      console.log(token);

    const pmBody = {
      "type": "card",
      "card[token]": token,
    }
    const pmToken = await axios.post('https://api.stripe.com/v1/payment_methods', pmBody, { headers })
    if (pmToken.status != 200) {
      throw Error('Failed in getting payment_methods in stripe.')
    }
    const pmData = pmToken.data

    const customerBody = {
      "description": "Subscribe Neopen Private Server",
      "payment_method": pmData['id'],
      "invoice_settings[default_payment_method]": pmData['id'],
      "email": email,
      "name": name,
    }
    const customerToken = await axios.post('https://api.stripe.com/v1/customers', customerBody, { headers })
    if (customerToken.status != 200) {
      throw Error('Failed in getting customers in stripe.')
    }
    const customerData = customerToken.data
    const customerID = customerData['id']

    const subPrice = getPrice(price)
    const subscribeBody = {
      "customer": customerID,
      "items[0][price]": subPrice,
    }
    const subscriptionToken = await axios.post('https://api.stripe.com/v1/subscriptions', subscribeBody, { headers })
    if (subscriptionToken.status != 200) {
      throw Error('Failed in subscribing with current customer in stripe.')
    }
    const subscriptionData = subscriptionToken.data
    return {
      subscriptionId: subscriptionData['id'],
      customerID: customerID,
    }
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

    const subPrice = getPrice(price)
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

const getPrice = (price: any) => {
  let subPrice: string | undefined = ""
  switch (price) {
    case '30':
      subPrice = price30;
      break;
    case '55':
      subPrice = price55;
      break;
    case '75':
      subPrice = price75;
      break;
      
    case '100':
      subPrice = price100;
      break;
    case '125':
      subPrice = price125;
      break;
    case '150':
      subPrice = price150;
      break;
    case '175':
      subPrice = price175;
      break;

    case '200':
      subPrice = price200;
      break;
    case '225':
      subPrice = price225;
      break;
    case '250':
      subPrice = price250;
      break;
    case '275':
      subPrice = price275;
      break;

    case '300':
      subPrice = price300;
      break;
    case '325':
      subPrice = price325;
      break;
    case '350':
      subPrice = price350;
      break;
    case '375':
      subPrice = price375;
      break;

    case '400':
      subPrice = price400;
      break;
    case '425':
      subPrice = price425;
      break;
    case '450':
      subPrice = price450;
      break;
    case '475':
      subPrice = price475;
      break;

    case '500':
      subPrice = price500;
      break;
    case '525':
      subPrice = price525;
      break;
    case '550':
      subPrice = price550;
      break;
    case '575':
      subPrice = price575;
      break;

    case '600':
      subPrice = price600;
      break;
    case '625':
      subPrice = price625;
      break;
    case '650':
      subPrice = price650;
      break;
    case '675':
      subPrice = price675;
      break;

    case '700':
      subPrice = price700;
      break;
    case '725':
      subPrice = price725;
      break;
    case '750':
      subPrice = price750;
      break;
    case '775':
      subPrice = price775;
      break;

    case '800':
      subPrice = price800;
      break;
    case '825':
      subPrice = price825;
      break;
    case '850':
      subPrice = price850;
      break;

    case '900':
      subPrice = price900;
      break;
    case '925':
      subPrice = price925;
      break;
    case '950':
      subPrice = price950;
      break;
    case '975':
      subPrice = price975;
      break;

    case '1000':
      subPrice = price1000;
      break;
    case '999':
      subPrice = price999;
      break;
    default:
      subPrice = price100;
      break;
  }
  return subPrice;
}

