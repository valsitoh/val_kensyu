#!/bin/sh

FILES="
index.html
app.js
"

for f in ${FILES}
do
	echo "-=> Upload ${f}"
	aws s3 cp app/${f} s3://${S3_TOOLS_BACKET}/
done

