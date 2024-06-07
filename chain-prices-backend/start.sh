#!/bin/bash

if [ "$1" = "build" ]; then
    docker compose --env-file .env up -d
elif [ "$1" = "restart" ]; then
    docker compose restart
elif [ "$1" = "stop" ]; then
    docker compose stop
elif [ "$1" = "start" ]; then
    docker compose start
else 
    echo "Wrong command"
fi