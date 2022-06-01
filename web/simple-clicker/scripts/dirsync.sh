#!/bin/bash
set -ue

cp -r ./build/public ./files/public
cp ./build/.gitignore ./files/.gitignore
cp ./build/index.js ./files/index.js
cp ./build/package.json ./files/package.json
