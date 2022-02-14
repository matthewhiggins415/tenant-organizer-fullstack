const express = require('express')
const router = express.Router()
const passport = require('passport')
const Tenant = require ('../models/tenant')
const Property = require('../models/property')
const errors = require('../../lib/custom_errors')
const requireToken = passport.authenticate('bearer', { session: false })

//create a new tenant
router.post('/tenant', requireToken, (req, res, next) => {  
    console.log(`req.user: ${req.user}`)
    let landlordID = req.user.id
    let tenantData = req.body.tenant
    tenantData.owner = landlordID
   
    Tenant.create(tenantData)
      .then( tenant => {
          res.json({ tenant })
      })
      .catch(next)
})

//read tenants belonging to landlord 
router.get('/tenants/:id', requireToken, (req, res, next) => {
    //pass property id to :id of route
    let propertyID = req.params.id
    Tenant.find({ 'property': propertyID })
        .then(tenants => {
            res.json({ tenants })
        })
})

// get a single tenant
router.get('/tenant/:id', requireToken, (req, res, next) => {
    let id = req.params.id
    Tenant.findById(id)
        .then(tenant => {
            res.json({ tenant })
        })
        .catch(next)
})

//read all tenant belonging to user
//protected
//method: GET
//path: /tenants
router.get('/tenants', requireToken, (req, res, next) => {
    let landlordID = req.user.id
    Tenant.find({ 'owner': landlordID })
        .populate('owner')
        .then(tenants => {
            res.json({ tenants })
        })
})

//update a single tenant 
router.patch('/tenant/:id', requireToken, (req, res, next) => {
    let id = req.params.id
    let data = req.body.tenant
    Tenant.findById(id) 
        .then(tenant => {
            tenant.set(data)
            return tenant.save()
        })
        .then(tenant => {
            res.json({ tenant })
        })
        .catch(next)
})

//delete tenant 
router.delete("/tenant/:id", requireToken, (req, res, next) => {
    let id = req.params.id
    Tenant.findById(id)
        .then(tenant => {
            tenant.deleteOne()
        })
        .then(() => res.send(204))
        .catch(next)
})

module.exports = router