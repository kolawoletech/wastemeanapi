const model = require('../models/jobRequest')
const { matchedData } = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
 
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var XMLHttpRequest = require('node-http-xhr');



/*********************
 * Private functions *
 *********************/

/**
 * Checks if a job request already exists excluding itself
 * @param {string} id - id of item
 * @param {string} name - name of item
 */
const jobRequestExistsExcludingItself = async (id, name) => {
    return new Promise((resolve, reject) => {
      model.findOne(
        {
          title,
          _id: {
            $ne: id
          },
          
        },
        (err, item) => {
          utils.itemAlreadyExists(err, item, reject, 'JOB_REQUEST_ALREADY_EXISTS')
          resolve(false)
        }
      )
    })
  }
  
  /**
   * Checks if a job already exists in database
   * @param {string} title - name of item
   */
  const jobRequestExists = async title => {
    return new Promise((resolve, reject) => {
      model.findOne(
        {
          title
        },
        (err, item) => {
          utils.itemAlreadyExists(err, item, reject, 'JOB_REQUEST_ALREADY_EXISTS')
          resolve(false)
        }
      )
    })
  }
  
  /**
   * Gets all items from database
   */
  const getAllItemsFromDB = async () => {
    return new Promise((resolve, reject) => {
      model.find(
        {},
        '-updatedAt -createdAt',
        {
         
        },
        (err, items) => {
          if (err) {
            reject(utils.buildErrObject(422, err.message))
          }
          resolve(items)
        }
      )
    })
  }
  
  /********************
   * Public functions *
   ********************/
  
  /**
   * Get all items function called by route
   * @param {Object} req - request object
   * @param {Object} res - response object
   */
  exports.getAllItems = async (req, res) => {
    try {
      res.status(200).json(await getAllItemsFromDB())
    } catch (error) {
      utils.handleError(res, error)
    }
  }
  
  /**
   * Get items function called by route
   * @param {Object} req - request object
   * @param {Object} res - response object
   */
  exports.getItems = async (req, res) => {
    try {
      const query = await db.checkQueryString(req.query)
      res.status(200).json(await db.getItems(req, model, query))
    } catch (error) {
      utils.handleError(res, error)
    }
  }
  
  /**
   * Get item function called by route
   * @param {Object} req - request object
   * @param {Object} res - response object
   */
  exports.getItem = async (req, res) => {
    try {
      req = matchedData(req)
      const id = await utils.isIDGood(req.id)
      res.status(200).json(await db.getItem(id, model))
    } catch (error) {
      utils.handleError(res, error)
    }
  }
  
  /**
   * Update item function called by route
   * @param {Object} req - request object
   * @param {Object} res - response object
   */
  exports.updateItem = async (req, res) => {
    try {
      req = matchedData(req)
      const id = await utils.isIDGood(req.id)
      const doesJobRequestExists = await jobRequestExistsExcludingItself(id, req.jobRequestId)
      if (!doesJobRequestExists) {
        res.status(200).json(await db.updateItem(id, model, req))
      }
    } catch (error) {
      utils.handleError(res, error)
    }
  }
  
  /**
   * Create item function called by route
   * @param {Object} req - request object
   * @param {Object} res - response object
   */
  exports.createItem = async (req, res) => {
    try {
      req = matchedData(req)
      const doesJobRequestExists = await jobRequestExists(req.jobRequestId)
      if (!doesJobRequestExists) {
        res.status(201).json(await db.createItem(req, model))
        var apiKey="";


        const request = require('request');
 

  
        console.log(req.numbers);

        var arrayofPhoneNumbers = req.numbers.split('\\')[0];
        console.log("SAT" + arrayofPhoneNumbers.split(','))

        for (var i = 0; i < arrayofPhoneNumbers.split(',').length; i++) {
          console.log("LOgging: " + arrayofPhoneNumbers.split(',')[i].replace(/[\[\]']+/g,''))

          let courierNumber = arrayofPhoneNumbers.split(',')[i].replace(/[\[\]']+/g,'')
          console.log("Title: " + req.title + ". ID: " + req.id + ". Waste Type: " + req.wasteType + " Dustbin Number: " + req.dustbinNumber + "Courier Number: " + courierNumber)

          request('https://platform.clickatell.com/messages/http/send?apiKey='+ apiKey +'&to='+courierNumber + '&content=' + " Title: " + req.title + ". ID: " + req.id + ".  Waste Type: " + req.wasteType + ". Dustbin Number: " + req.dustbinNumber, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
          });  
        }
      


      }
    } catch (error) {
      utils.handleError(res, error)
    }
  }
  
  /**
   * Delete item function called by route
   * @param {Object} req - request object
   * @param {Object} res - response object
   */
  exports.deleteItem = async (req, res) => {
    try {
      req = matchedData(req)
      const id = await utils.isIDGood(req.id)
      res.status(200).json(await db.deleteItem(id, model))
    } catch (error) {
      utils.handleError(res, error)
    }
  }
  