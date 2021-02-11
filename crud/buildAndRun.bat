@echo off
call mvn clean package
call docker build -t com.mycompany/crud .
call docker rm -f crud
call docker run -d -p 9080:9080 -p 9443:9443 --name crud com.mycompany/crud