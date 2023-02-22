#Shell script to export all data from csv folder to quotes table in database
#!/bin/bash

$URL = "postgresql://username:password@host:port/database_name"
quote_id=1

for FILE in ../csv/*; do
    psql $URL << EOF
        \copy quotes(content, author) FROM '$FILE' DELIMITER ',' CSV HEADER;
        UPDATE quotes SET tag_id = $quote_id WHERE tag_id IS NULL;
EOF
    quote_id=$((quote_id+1))
done