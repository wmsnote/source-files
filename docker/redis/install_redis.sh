#!/usr/bin/env bash

#set -euxo pipefail
set -x
set -u
set -o pipefail




redis_image_exist=$(docker images --format "{{.Repository}}" | grep -c redis)

if [[ "${redis_image_exist}" == 0 ]] ;then
    docker pull redis
else
    echo "redis image exist"
fi

redis_running=$(docker ps --format "{{.Names}}" | grep -c redis)

echo "============"

if [[ "${redis_running}" == "1" ]]; then
    echo "redis is running";sleep 3
    exit 0
else
    echo "redis is not running";sleep 3
fi

redis_container_exist=$(docker ps -a --format "{{.Names}}" | grep "redis" -c)

if [[ "${redis_container_exist}" == "1" ]]; then
    echo "redis container exist,start container redis"
    docker start redis
else
    docker run --name redis \
        -p 6379:6379 \
        -v /home/user/redis:/data \
        -d redis redis-server \
        --appendonly yes
fi

# docker run --name redis-cli -it --link redis:redis --rm redis redis-cli -h redis
## --link官方不推荐使用;推荐使用--network

# docker run --name redis-cli -it --network bridge --rm redis redis-cli -h redis
# 在没有指定 network 的情况下,docker 默认使用的是 bridge 网络
# 使用默认的 bridge 网络，不能通过DNS server实现通过容器名通信，但是使用自定义bridge网络可以做到通过容器名互相通信。
# 自己定义网络
# docker network create --driver bridge network_name
# 自定义 bridge 提供更好的隔离性和容器间的互操作性,推荐使用

## 我们是开发就不讲究了,使用--link临时用一下,没有关系



