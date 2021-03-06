const express = require('express')
const router = express.Router()
const passport = require('passport')
const Property = require('../models/property')
const Landlord = require('../models/landlord')
const errors = require('../../lib/custom_errors')
const requireToken = passport.authenticate('bearer', { session: false })

const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError

//create a new property
//protected
//method: POST
//path: /property
router.post('/property', requireToken, (req, res, next) => {
    let landlordID = req.user.id
    let propertyData = req.body.property
    propertyData.owner = landlordID

    Property.create(propertyData)
        .then(property => {
            res.json({ property })
        })
        .catch(next)
})

//read all properties belonging to user
//protected
//method: GET
//path: /property
router.get('/property', requireToken, (req, res, next) => {
    let landlordID = req.user.id
    Property.find({ 'owner': landlordID })
        .populate('owner')
        .then(properties => {
            res.json({ properties })
        })
})

//read a single property
//protected
//method: GET
//path: /property/:id
router.get('/property/:id', requireToken, (req, res, next) => {
    let id = req.params.id
    Property.findById(id)
        .then(property => {
            res.json({ property })
        })
        .catch(next)
})

//update a single property
//protected
//method: PATCH
//path: /property/:id
router.patch('/property/:id', requireToken, (req, res, next) => {
    let id = req.params.id
    let data = req.body.property
    Property.findById(id) 
        .then(property => {
            property.set(data)
            return property.save()
        })
        .then(property => {
            res.json({ property })
        })
        .catch(next)
})

//delete a single property
//protected
//method: DELETE
//path: /property/:id
router.delete('/property/:id', requireToken, (req, res, next) => {
    let id = req.params.id
    Property.findById(id)
        .then(property => {
            property.deleteOne()
        })
        .then(() => res.send(204))
        .catch(next)
})


//Add a task to a property
//Protected 
//method: PATCH
//path: /propertytask/:id
router.patch('/propertytask/:id', requireToken, (req, res, next) => {
    let id = req.params.id
    let task = req.body.task
    Property.findById(id)
      .then(property => {
        property.tasks.push(task)
        return property.save()
      })
      .then(property => {
          res.json({ property })
      })
      .catch(next)
})


//Remove a task to a property
//Protected 
//method: PATCH
//path: /propertytask/:id
router.delete('/propertytask/:id/:taskId', requireToken, (req, res, next) => {
    let id = req.params.id
    let taskId = req.params.taskId
    Property.findById(id)
      .then(property => {
        console.log(taskId)
        console.log(property.tasks)
        let updatedArr = property.tasks.filter(task => task._id != taskId )
        property.tasks = updatedArr 
        return property.save()
      })
      .then(property => {
          res.json({ property })
      })
      .catch(next)
})

//mark task complete

//mark task incomplete 

module.exports = router 