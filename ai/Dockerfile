# syntax=docker/dockerfile:1

FROM python:3.10-bullseye

EXPOSE 7865

WORKDIR /app

COPY . .

RUN apt-get update && \
    apt-get install -y ffmpeg && \
    rm -rf /var/lib/apt/lists/*

RUN pip3 install -r requirements.txt

VOLUME [ "/app/weights", "/app/input", "/app/logs", "/app/TEMP"]

CMD ["python3", "run_uvicorn.py"]
