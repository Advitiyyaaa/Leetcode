const { createClient } = require('redis');
require('dotenv').config()

const RedisClient = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host:  process.env.REDIS_HOST,
        port:  process.env.REDIS_PORT
    }
});

module.exports = RedisClient


