#!/bin/sh

export SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"
echo "$SCRIPT_DIR"

for (( i=1; i <= $ELASTIC_GENERATE_DATA_SIZE ; i++ ))
do
	node elastic.js --batch=$SCRIPT_DIR/data/bulk$i.post
done
