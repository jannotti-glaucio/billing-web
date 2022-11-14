#!/bin/bash
set -e
rm -rf dist
ng build --prod --env=prod
cd dist
find *.svg -type f -not -name 'fontawesome-webfont.*.svg' -not -name 'Simple-Line-Icons.*.svg' -delete
tar -czf billing-web-prod.tar.gz * --remove-files
