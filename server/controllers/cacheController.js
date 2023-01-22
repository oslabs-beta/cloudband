const Redis = require('ioredis');
const dotenv = require('dotenv');
dotenv.config();

// Redis instance for cache
const cache = new Redis({
  // host: process.env.REDIS_URL,
  // port: Number(process.env.REDIS_PORT),
  // password: process.env.REDIS_PASSWORD, //password if using redis cloud
  host: '127.0.0.1',
  port: 6379,
  // password: process.env.REDIS_PASSWORD,
});

// console.log(
//   process.env.REDIS_URL_,
//   process.env.REDIS_PORT_,
//   process.env.REDIS_PASSWORD_
// );

// redis get function to look up arn + specific query in cache
const cacheGet = async (req, res, next) => {
  try {
    // take user specific information and the endpoint they are accessing as keys for redis
    // const { arn } = res.locals.userData;
    // const queryString = req.originalUrl;
    // const { region } = req.body;
    const { arn } = req.query;
    const region = 'us-east-1';
    // const queryString = req.originalUrl;
    const queryString = req.query.currFunc;
    console.log('queryString', queryString);

    // variable to check whether user wants to bypass retrieving from cache and get fresh data
    // let { sync } = req.body;

    // const cachedData = await cache.get(`${arn}${queryString}${region}`);
    const cachedData = await cache.get(
      `${req.query.arn}${req.originalUrl}us-east-1`
    );

    console.log('cachedData', cachedData);
    // bypass if cached data is found and sync is true
    // if (typeof cachedData === 'string' && !sync) {
    console.log('type of cacheData', typeof cachedData);
    if (typeof cachedData === 'string') {
      console.log('found cached data for ', cachedData);
      res.status(200).send(JSON.parse(cachedData));
    } else {
      console.log('no cached data found');
      next();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// redis set function to set arn + specific query, TTL, and the cached value
const cacheSet = async (req, res, next) => {
  //declare map of Time to expire ( in seconds )
  // const timeScale = {
  //   '7d': 24 * 60 * 60,
  //   '24hr': 12 * 60 * 60,
  //   '12hr': 60 * 60,
  //   '1hr': 30 * 60,
  // };

  // if (!req.params.period) req.params.period = '24hr'; // default to 1 for
  console.log('setting into cache');
  cache.set(
    // `${res.locals.userData.arn}${req.originalUrl}${req.body.region}`,
    `${req.query.arn}${req.originalUrl}us-east-1`,
    JSON.stringify(res.locals.toBeCached),
    'EX',
    60 * 60
    // timeScale[req.params.period]
  );
  console.log('cache is set');
  next();
};

module.exports = { cacheGet, cacheSet };
