#!/usr/bin/env bash

cd ..

podman run --env-file .env -d -p 3001:3001 --name wx-s-advisor gandigit/wx-s-advisor

podman logs wx-s-advisor

