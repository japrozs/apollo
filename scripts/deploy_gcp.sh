#!/bin/bash

echo What should the version be ?
read VERSION

cd ../server
echo "$ docker build -t japrozs/apollo:$VERSION ."
docker build -t japrozs/apollo:$VERSION .

echo "$ docker push japrozs/apollo:$VERSION"
docker push japrozs/apollo:$VERSION
cd ..
ssh -i root root@34.135.26.149 "docker pull japrozs/apollo:$VERSION && docker tag japrozs/apollo:$VERSION dokku/api:$VERSION && dokku tags:deploy api $VERSION"