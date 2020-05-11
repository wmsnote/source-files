#!/usr/bin/env bash


docker run -v "$PWD"/redis.conf:/usr/local/etc/redis/redis.conf \
-v "$(pwd)"/data:/data \
--name redis \
-d redis \
redis-server /usr/local/etc/redis/redis.conf

# redis-cli
# docker run --name redis-cli -it --link redis:redis --rm redis redis-cli -h redis

