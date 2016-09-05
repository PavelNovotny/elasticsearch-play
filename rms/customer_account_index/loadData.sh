#!/bin/sh

export SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"
echo "$SCRIPT_DIR"

node elastic.js --batch=$SCRIPT_DIR/data/bulk.post

