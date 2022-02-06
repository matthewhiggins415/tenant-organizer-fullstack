const express = require('express')
const router = express.Router()
const passport = require('passport')
const Landlord = require('../models/landlord')

const errors = require('../../lib/custom_errors')
const requireToken = passport.authenticate('bearer', { session: false })

const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError

//create a connected account
const stripe = require('stripe')('sk_test_51HJm1cBZYewzjCOyvpdomzuWTvuOM9dHYKGQ2rNCeCiqVjIuyx5aCnDFROacZwpXKBov4kO8uupFZ7lZi6661OeT00ijzNxac9');


//route for creating a Connected Express Stripe Account for user 
router.post('/landlord/:id/stripe/create', requireToken, async (req, res, next) => {
    //find the user
    let landlordID = req.params.id
    const landlord = await Landlord.findById(landlordID)

    //create account with user
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'US',
      email: landlord.email,
      capabilities: {
        card_payments: {requested: true},
        transfers: {requested: true},
      },
    });

    landlord.stripeAccountCreated = true
    landlord.stripeId = account.id
    landlord.save()

    res.json(landlord)
})


//route for creating an accountLink 
router.post(`/landlord/:id/stripe/accountLink`, requireToken, async (req, res, next) => {
  let id = req.params.id
  const landlord = await Landlord.findById(id)
  let stripeId = landlord.stripeId
  
  const accountLink = await stripe.accountLinks.create({
    account: stripeId,
    refresh_url: 'https://example.com/reauth',
    return_url: `http://localhost:4741/stripe/${id}/return`,
    type: 'account_onboarding',
  });

  res.json(accountLink)
})

//Route for retrieving the Stripe account of a User 
router.get('/landlord/:id/stripe/account', requireToken, async (req, res, next) => {
    let landlordID = req.params.id
    console.log(landlordID)
    const landlord = await Landlord.findById(landlordID)
    let stripeId = landlord.stripeId

    const stripeAccount = await stripe.accounts.retrieve(stripeId);

    res.json(stripeAccount)
})

// Route for stripe webhooks 
router.post('/landlord/webhooks', (req, res) => {
    const event = req.body
    //handle the event 
    switch (event.type) {
      case 'account.updated':
        const accountUpdate = event.data.object;
        res.json(accountUpdate)  
        break;
      // handle other event types. 
      default:
      console.log(`Unhandled event type ${event.type}`);
    }
})


//Route for return urls from accountLink
router.get('/stripe/:id/return', async (req, res, next) => {
    //make the backend request to the 
    //update the user
    // res.sendFile(__dirname + '/return.html')

    //make another request to the account Retrieve api 
    //grab the landlord id from url 
    //use id to access db to find user 
    //grab stripe id
    //use stripeid to make account retrieve call 
    //get the stripe account and look to see if details are gtg
    //if good update the db and do something like a redirect to somewhere
    //if not good do something else 

    let id = req.params.id
    const landlord = await Landlord.findById(id)
    let stripeId = landlord.stripeId

    const stripeAccount = await stripe.accounts.retrieve(stripeId);

    if (stripeAccount.details_submitted === true) {
      landlord.stripeAccountActive = true
      landlord.save()
      res.json({landlord})
    }

    console.log('running')
})

router.get('/stripe/refresh', (req, res, next) => {
    res.sendFile(__dirname + '/refresh.html')
})

module.exports = router