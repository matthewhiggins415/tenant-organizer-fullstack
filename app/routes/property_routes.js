const express = require('express')
const router = express.Router()
const passport = require('passport')
const Property = require('../models/property')
const errors = require('../../lib/custom_errors')
const requireToken = passport.authenticate('bearer', { session: false })

const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError

//create a new property
//protected
//method: POST
//path: /property
router.post('/property', requireToken, (req, res, next) => {
    let data = req.body.property
    res.json({ data })
    
})

//read all properties belonging to user
//protected
//method: GET
//path: /property
router.get('/property', (req, res, next) => {
    
})

//read a single property
//protected
//method: GET
//path: /property/:id
router.get('', (req, res, next) => {

})

//update a single property
//protected
//method: PATCH
//path: /property/:id
router.patch('', (req, res, next) => {

})

//delete a single property
//protected
//method: DELETE
//path: /property/:id
router.delete('', (req, res, next) => {

})

module.exports = router 