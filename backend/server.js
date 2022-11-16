const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

app.use("/search", async (req, res) => {
  const apiRes = await axios({
    url: `https://api.yelp.com/v3/businesses/search`,
    params: req.query,
    headers: {
      Authorization: req.header("Authorization"),
    },
  });

  res.json(apiRes.data);
});

app.use("/autocomplete", async (req, res) => {
  const apiRes = await axios({
    url: `https://api.yelp.com/v3/autocomplete`,
    params: req.query,
    headers: {
      Authorization: req.header("Authorization"),
    },
  });
  res.json(apiRes.data);
});

app.use("/detail", async (req, res) => {
  try {
    // console.log(req.url);
    const id = req.url;
    const apiRes = await axios({
      url: `https://api.yelp.com/v3/businesses${id}`,
      headers: {
        Authorization:
          "Bearer pvwAzDkoQqbsC8dzksa9R3ScsLuerrVw8b3RC0YuAVPJnasUdK3CLCgWyFEIH1wFS2iqW1Ykx3z1wFGaYGgHyxhiJ4dVvTrgg5Kqr-yl3ju7fpm3OrkdjefoGj9jY3Yx",
      },
    });
    res.json(apiRes.data);
  } catch {
    res.send("Error");
  }
});

app.use("/reviews", async (req, res) => {
  const apiRes = await axios({
    url: `https://api.yelp.com/v3/businesses/${req.query.text}/reviews`,
    headers: {
      Authorization: req.header("Authorization"),
    },
  });
  res.json(apiRes.data);
});

app.listen(8081);
