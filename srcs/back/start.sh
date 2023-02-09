#!/bin/sh
rm -rf node_modules
npm update
npm upgrade
npm ci
npm run build
npm run start:dev
#npm run start:prod