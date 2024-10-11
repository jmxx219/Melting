#!binbash

WEBHOOK_URL=httpsmeeting.ssafy.comhooks145xrm8t33f1by3az1p3mfpm3w
BUILD_FILE=~meltingmelting-fedistindex.html
TIMEOUT=60

if [ -f $BUILD_FILE ] && [ $(($(date +%s) - $(stat -c %Y $BUILD_FILE))) -lt $TIMEOUT ]; then
    curl -i -X POST -H 'Content-Type applicationjson' 
    -d '{text [FE] React 빌드 완료}' $WEBHOOK_URL
else
    curl -i -X POST -H 'Content-Type applicationjson' 
    -d '{text [FE] React 빌드 실패 빌드 결과를 찾을 수 없거나 최신 빌드가 아닙니다.}' $WEBHOOK_URL
    exit 1
fi