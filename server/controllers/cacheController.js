const Redis = require('ioredis');
const dotenv = require('dotenv');
dotenv.config();

const cache = new Redis({
  host: process.env.REDIS_URI_,
  port: Number(process.env.REDIS_PORT_),
  password: process.env.REDIS_PASSWORD_, //password if using redis cloud
});

const cacheGet = async (req, res, next) => {
  try {
    const queryString = req.originalUrl;
    console.log('queryString', queryString);

    const key = `${queryString}`;

    const cachedData = await cache.get(key);

    console.log('cachedData', cachedData);

    if (cachedData) {
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

const cacheSet = async (req, res, next) => {
  console.log('setting into cache');
  const queryString = req.originalUrl;
  console.log('queryString', queryString);

  const key = `${queryString}`;
  cache.set(`${key}`, JSON.stringify(res.locals.toBeCached), 'EX', 30 * 60);
  console.log('cache is set');
  next();
};

module.exports = { cacheGet, cacheSet };
