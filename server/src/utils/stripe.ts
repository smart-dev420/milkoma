import axios from 'axios'

const stripeBearerToken = process.env.STRIPE_SECRET_KEY;

export const subscribe = async (input: any) => {
  try {
    const { email, name, method, price, details } = input;
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Bearer " + stripeBearerToken
    };
    let token = details       
      const { cardNumber, expiredYear, expiredMonth, cvc } = JSON.parse(details)
      const cardBody = {
        "card[number]": cardNumber,
        "card[exp_month]": expiredMonth,
        "card[exp_year]": expiredYear,
        "card[cvc]": cvc,
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
