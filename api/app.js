// initialize the .env config file
require('dotenv').config()

// main express
const express = require('express')
const app = express()

// other required
const path = require('path')
const bodyParser = require('body-parser')

// date parser
const moment = require('moment')

// set the view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'twig')

// set other things
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))

// setup the database connection
const MongoClient = require('mongodb').MongoClient

let cachedDb = null

// connect to the database (serveless setup)
async function connectToDB() {
  if (cachedDb) {
    return cachedDb
  }

  const client = await MongoClient.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = await client.db('Tweets_Serverless')

  // cache the database and return the connection
  cachedDb = db
  return db
}

// check if the env is set
if (!process.env.MONGO_DB) {
  console.log('The MONGO_DB environment variable is not set!')
}

// set the webapp title
const websiteTitle = 'Klopp - a Public Tweeter'

// for form validation
const { body, validationResult } = require('express-validator')

// default index route
app.get('/', async (req, res) => {
  // get connection to the db
  const db = await connectToDB()

  // get the tweets from the collection
  var tweets = await db.collection('tweets')

  tweets
    .find()
    .sort({ tweet_date: -1 })
    .toArray(function (err, posts) {
      res.render('index', { title: websiteTitle, tweets: posts })
    })
})

// post the tweet
app.post(
  '/',
  [
    body('content')
      .isLength({ min: 10 })
      .trim()
      .escape()
      .withMessage('Your tweet is too short! Add some more!'),
    body('user')
      .isLength({ min: 3 })
      .trim()
      .escape()
      .withMessage('Your name should be atleast three characters minimum.'),
  ],
  async (req, res) => {
    // connect to the database
    const db = await connectToDB()

    // get the tweets
    var tweets = await db.collection('tweets')

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      tweets
        .find()
        .sort({ tweet_date: -1 })
        .toArray(function (err, posts) {
          res.render('index', {
            title: websiteTitle,
            errors: errors,
            tweets: posts,
          })
        })
    } else {
      // if data is valid, save the content
      const now = new Date(new Date().toUTCString())
      var randomTweet = {
        tweet_user: req.body.user,
        tweet_content: req.body.content,
        tweet_date: moment(now).format('MMMM D, YYYY | hh:mm A UTC'), // format already the date, I'm tired :)
      }

      tweets
        .insertOne(randomTweet)
        .then((result) => {
          const success = 'You have successfully posted your tweet!'
          tweets
            .find()
            .sort({ tweet_date: -1 })
            .toArray(function (err, posts) {
              res.render('index', {
                title: websiteTitle,
                tweets: posts,
                success: success,
              })
            })
        })
        .catch((error) => console.error(error))
    }
  },
)

// export the app
module.exports = app
