import redis from "ioredis";
import { promisify } from "util";

import config from "../config";

const host: string = config.redis.host || "localhost";
const port = parseInt(config.redis.port) || 6379;

const client = new redis(port, host);

// client.on("connect", () => {
//   console.log("Connected to Redis successfully!");
// });

// client.on("error", (error) => {
//   console.log("Redis connection error :", error);
// });

client.get = promisify(client.get).bind(client);
client.set = promisify(client.set).bind(client);
client.del = promisify(client.del).bind(client);
client.expire = promisify(client.expire).bind(client);

export { client };
