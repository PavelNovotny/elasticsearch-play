#!/bin/sh
export SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"
echo "$SCRIPT_DIR"
node /home/elastic/node-apps/dummy-json-play/lib/index.js $SCRIPT_DIR/data/bulk_template.json  $SCRIPT_DIR/data/bulk.txt

