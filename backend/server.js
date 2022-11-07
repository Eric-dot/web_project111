const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const axios = require('axios')
const cors = require('cors')

const app = express()

app.use(cors())

app.use('/search', async (req, res) => {
  const apiRes = await axios({
    url: `https://api.yelp.com/v3/businesses/search`,
    params: req.query,
    headers: {
      Authorization: req.header('Authorization'),
    },
  })
  res.json(apiRes.data)
})


app.use('/autocomplete', async (req, res) => {
  const apiRes = await axios({
    url: `https://api.yelp.com/v3/autocomplete`,
    params: req.query,
    headers: {
      Authorization: req.header('Authorization'),
    },
  })
  res.json(apiRes.data)
})


app.use('/detail', async (req, res) => {
  const apiRes = await axios({
    url:`https://api.yelp.com/v3/businesses/${req.query.text}`,
    headers: {
      Authorization: req.header('Authorization'),
    },
  })
  res.json(apiRes.data)
})
app.listen(8081); 