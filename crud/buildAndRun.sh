#!/bin/sh
mvn clean package && docker build -t com.mycompany/crud .
docker rm -f crud || true && docker run -d -p 9080:9080 -p 9443:9443 --name crud com.mycompany/crud