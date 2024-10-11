#!/bin/bash

IMAGE_NAME="melting-spring"
IMAGE_TAG="latest"
CONTAINER_NAME="melting-spring-container"
LOG_DIR=~/melting_log
WEBHOOK_URL="https://meeting.ssafy.com/hooks/145xrm8t33f1by3az1p3mfpm3w"
now_port=8080

TIMEOUT=20
SECONDS=0

# Docker 이미지 빌드
docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ~/melting/spring-docker

if [ $? -eq 0 ]; then
    curl -i -X POST -H 'Content-Type: application/json' -d '{"text": "**[BE]** Docker 이미지가 성공적으로 빌드되었습니다."}' $WEBHOOK_URL
else
    curl -i -X POST -H 'Content-Type: application/json' -d '{"text": "**[BE]** Docker 이미지 빌드에 실패했습니다."}' $WEBHOOK_URL
    exit 1
fi

# 기존에 실행 중인 컨테이너가 있으면 중지 및 제거
existing_container=$(docker ps -aq -f name=${CONTAINER_NAME})

if [ -n "$existing_container" ]; then
    echo "Stopping and removing existing container..."
    docker stop ${CONTAINER_NAME} || true  # 이미 중지된 경우 무시
    docker rm -f ${CONTAINER_NAME}  # 강제 삭제
fi

# 도커 컨테이너 실행
docker run -d --name ${CONTAINER_NAME} --network melting-network -p 8080:8080 -e TZ=Asia/Seoul ${IMAGE_NAME}:${IMAGE_TAG}

# 사용하지 않는 이미지를 제거
dangling_images=$(docker images -f "dangling=true" -q)
if [ -n "$dangling_images" ]; then
    docker rmi $dangling_images
fi

sleep 5

# webhook
while true; do
    response=$(curl -s -o /dev/null -w "%{http_code}" http://172.26.12.66:$now_port/swagger-ui/index.html)

    if [ "$response" -eq 200 ]; then
        curl -i -X POST -H 'Content-Type: application/json' -d '{"text": "**[BE]** 정상적으로 서버를 배포 했습니다."}' $WEBHOOK_URL
        break
    fi

    # 시간 초과 확인
    if [ $SECONDS -ge $TIMEOUT ]; then
        curl -i -X POST -H 'Content-Type: application/json' -d '{"text": "**[BE]** 시간 초과: 서버가 정상적으로 작동하지 않습니다."}' $WEBHOOK_URL
        exit 1
    fi

    sleep 1  # 1초 대기 후 다시 확인
    echo "다시 확인중"
done
