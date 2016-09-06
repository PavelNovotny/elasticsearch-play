#!/bin/sh
export SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"
echo "$SCRIPT_DIR"

batch_count=1
for (( i=1; i <= $batch_count ; i++ ))
do
	node /home/elastic/node-apps/dummy-json-play/lib/index.js $SCRIPT_DIR/data/bulk_template.json  $SCRIPT_DIR/data/bulk$i.txt $i
done

