import { createClient, RedisClientType } from 'redis';
import { promisify } from 'util';

const redisClient: RedisClientType = createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

export default function Cacheable(ttl: number) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const cacheKey = `${propertyKey}:${JSON.stringify(args)}`;
            const cachedData = await getAsync(cacheKey);

            if (cachedData) {
                return JSON.parse(cachedData);
            }

            const result = await originalMethod.apply(this, args);
            await setAsync(cacheKey, JSON.stringify(result), 'EX', ttl);

            return result;
        };

        return descriptor;
    };
}