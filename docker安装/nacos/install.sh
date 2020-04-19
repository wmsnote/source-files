mkdir nacos && cd nacos
git clone https://github.com/nacos-group/nacos-docker.git
cd nacos-docker/example
mkdir standalone-logs mysql
# docker swarm init
# vim stantalone-mysql-8.yaml
docker stack deploy -c stantalone-mysql-8.yaml nacos
docker stack services nacos
docker stack ps nacos

## http://127.0.0.1:8848/nacos/#/login
## 认证: nacos/nacos


################################################################################################

version: "3"
services:
  nacos:
    image: nacos/nacos-server:latest
    env_file:
      - ../env/nacos-standlone-mysql.env
    volumes:
      - ./plugins/mysql/:/home/nacos/plugins/mysql/
      - ./standalone-logs/:/home/nacos/logs
      - ./init.d/custom.properties:/home/nacos/init.d/custom.properties
    ports:
      - "8848:8848"
      - "9555:9555"
    depends_on:
      - mysql
  mysql:
    image: nacos/nacos-mysql:8.0.16
    env_file:
      - ../env/mysql.env
    volumes:
      - ./mysql:/var/lib/mysql
    ports:
      - "3306:3306"











