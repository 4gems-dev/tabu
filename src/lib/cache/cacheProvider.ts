import { Type } from "lucide-react";

export const cacheProviderMap: Map<string, CachedValue> = new Map();

export type CachedValue = {
    key: string;
    value: any;
    expiration: number;
};

export function cacheProvider(key: string, value: any, expiration: number) {
    cacheProviderMap.set(key, { key, value, expiration });
}

export function cacheProviderGet(key: string) {
    const cachedValue = cacheProviderMap.get(key);
    if (cachedValue) {
        if (cachedValue.expiration > Date.now()) {
            return cachedValue.value;
        }
    }
    return null;
}


export function cacheProviderHas(key: string) {
    return cacheProviderMap.has(key);
}