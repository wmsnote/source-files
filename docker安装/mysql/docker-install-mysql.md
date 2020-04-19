---
title: docker install mysql
tags: docker,mysql
notebook: mysql
---

-----



```bash
mkdir ~/mysql
cd ~/mysql
docker pull mysql
docker run --name mysql \
    -e MYSQL_ROOT_PASSWORD=123456 \
    -p 3306:3306 \
    -v $PWD/DATA:/var/lib/mysql \
    -v $PWD/logs:/logs \
    -v $PWD/conf:/etc/mysql/conf.d \
    -d mysql \
    --character-set-server=utf8mb4 \
    --collation-server=utf8mb4_unicode_ci \
    --default-authentication-plugin=mysql_native_password
docker exec -it mysql /bin/bash
mysql -u root -p
use mysql
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
```

**everything is ok** ☯

