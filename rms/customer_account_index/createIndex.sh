#!/bin/sh
export SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"
echo "$SCRIPT_DIR"

node /home/elastic/node-apps/elastic/elastic.js --batch=$SCRIPT_DIR/definition/index.batch