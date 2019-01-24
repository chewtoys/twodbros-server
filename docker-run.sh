#!/bin/sh

docker load -i tdb-server.tar && \
docker-compose up -d
