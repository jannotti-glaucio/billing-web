#!/bin/bash
set -e
rm -rf dist
ng build --prod --env=sand
cd dist
find *.svg -type f -not -name 'fontawesome-webfont.*.svg' -not -name 'Simple-Line-Icons.*.svg' -delete
tar -czf billing-web-sandbox.tar.gz * --remove-files
