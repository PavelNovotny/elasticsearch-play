#!/bin/sh

export SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"
echo "$SCRIPT_DIR"

batch_count=1
for (( i=1; i <= $batch_count ; i++ ))
do
	node elastic.js --batch=$SCRIPT_DIR/data/bulk$1.post
done
