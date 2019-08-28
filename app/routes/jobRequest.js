const controller = require('../controllers/jobRequests')
const validate = require('../controllers/jobRequests.validate')
const AuthController = require('../controllers/auth')
const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

router.get(
    '/',
    requireAuth,
    AuthController.roleAuthorization(['admin']),
    trimRequest.all,
    controller.getItems
)

router.post(
    '/',
    requireAuth,
    AuthController.roleAuthorization(['admin']),
    trimRequest.all,
    validate.createItem,
    controller.createItem
)
  
  /*
   * Get item route
   */
router.get(
    '/:id',
    requireAuth,
    AuthController.roleAuthorization(['admin']),
    trimRequest.all,
    validate.getItem,
    controller.getItem
)

module.exports = router
