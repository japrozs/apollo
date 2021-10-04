#!/bin/bash

cd ../server
yarn build
heroku container:push --app=sleepy-tundra-93563 web
heroku container:release --app=sleepy-tundra-93563 web