#!/bin/sh
rm -rf node_modules
npm install
npm run build
npm run start:dev
#npm run start:prod