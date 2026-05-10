import redis from "../config/cache.js";

export const getCache = async (key) => {
  const data = await redis.get(key);

  return data ? JSON.parse(data) : null;
};

export const setCache = async (key, value, expiry = 3600) => {
  await redis.set(key, JSON.stringify(value), "EX", expiry);
};

export const deleteCache = async (key) => {
  await redis.del(key);
};
