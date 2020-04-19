#!/usr/bin/env bash


## Docker Swarm Visualizer

set -u
set -e

docker run -it -d -p 5000:8080 -v /var/run/docker.sock:/var/run/docker.sock --name visualizer dockersamples/visualizer




