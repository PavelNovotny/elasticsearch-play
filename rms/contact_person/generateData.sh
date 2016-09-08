#!/bin/sh
export SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"
echo "$SCRIPT_DIR"

rm $SCRIPT_DIR/data/*.post
rm $SCRIPT_DIR/data/*.txt


for (( i=1; i <= $ELASTIC_GENERATE_DATA_SIZE ; i++ ))
do
	node /home/elastic/node-apps/dummy-json-play/lib/index.js $SCRIPT_DIR/data/bulk_template.json  $SCRIPT_DIR/data/bulk$i.txt $i
	echo "POST /_bulk $SCRIPT_DIR/data/bulk$i.txt" >> $SCRIPT_DIR/data/bulk$i.post
done

