## 1. Dockerfile

```Dockerfile
FROM nginx
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
```

## 2. 部署脚本

```sh
#!/usr/bin/env bash

set -u
set -e

## =========================================================

echo "请选择要发布的环境?"

select ENVIRONMENT in prod  stage;
do
    break
done

if [[ "$ENVIRONMENT" != "prod" && "$ENVIRONMENT" != "stage" ]];then
echo "err input, quit now"
exit 1
fi

## ======================================================

read -r -p "确认发布到 $ENVIRONMENT 环境? [Y/n] " input

case $input in
    [yY][eE][sS]|[yY])
        echo "Yes"
        ;;

    [nN][oO]|[nN])
        echo "No"
        exit 0
        ;;

    *)
        echo "Invalid input..."
        exit 1
        ;;
esac

## =======================================================

sleep 3

## 打包
echo "============= 开始npm打包: npm run build:$ENVIRONMENT=================="

npm run build:$ENVIRONMENT

echo " ================== npm打包完成 ================== "

## =======================================================

sleep 3

# 构建镜像



IMAGE_NAME="vue-admin"
IMAGE_ID=$(date +%Y%m%d%H%M)
IMAGE_REGISTRY="registry.cn-beijing.aliyuncs.com"
IMAGE_NAMESPACE="boe-com"
IMAGE_FULLNAME=$IMAGE_REGISTRY/$IMAGE_NAMESPACE/$IMAGE_NAME:$IMAGE_ID

echo " ================== 开始构建镜像 IMAGE_FULLNAME: $IMAGE_FULLNAME ================== "



## 关闭shop_admin容器
#docker stop vue-admin || true;

## 删除shop_admin容器
#docker rm vue-admin || true;

## 删除shop/admin镜像
#docker rmi --force $(docker images | grep vue-admin | awk '{print $3}')

## 构建shop/admin:$image_version镜像
#docker build -t registry.cn-beijing.aliyuncs.com/prod-bigbay/$IMAGE_NAME:$IMAGE_ID --build-arg JAR_FILE=$JAR_FILE .
docker build -t $IMAGE_FULLNAME .

echo " ================== 镜像构建完成 ================== "

sleep 3
## =========================================================================

echo " ================== 开始推送镜像到远程仓库 ================== "

REGISTRY_USERNAME="t_1516617822136_0451"
read -p "please input image registry password: " -t 60 REGISTRY_PASSWORD


# docker logout
echo ${REGISTRY_PASSWORD:-"woms0613"} | docker login $IMAGE_REGISTRY -u $REGISTRY_USERNAME --password-stdin
docker push $IMAGE_FULLNAME


echo " ================== 镜像推送完成 ================== "

## 删除build过程中产生的镜像    #docker image prune -a -f
# docker rmi $(docker images -f "dangling=true" -q)

## 对空间进行自动清理
# docker system prune -a -f


## docker login aliyun
# sudo docker login --username=t_1516617822136_0451 registry.cn-beijing.aliyuncs.com

## 启动
# docker run --rm --name $IMAGE_NAME -p 80:80 -d $IMAGE_DOMAIN/$IMAGE_NAME:$IMAGE_VERSION

# echo "docker run --rm --name $IMAGE_NAME -p 80:80 -d $IMAGE_DOMAIN/$IMAGE_NAME:$IMAGE_VERSION"



```