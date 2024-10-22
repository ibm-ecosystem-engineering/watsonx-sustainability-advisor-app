#!/usr/bin/env bash

echo "build Started ...."

cd ..
podman build --platform linux/amd64 -f Dockerfile -t gandigit/wx-s-advisor:latest .

echo "build completed ...."

