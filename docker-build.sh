#!/bin/sh

docker build -t tdb-server . && \
docker save -o tdb-server.tar tdb-server:latest
