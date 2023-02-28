The database URL is stored in .env

The server attempts to connect to the URL using psycopg2. If successful, it then initializes a cursor as a pointer to the database.
Each endpoint (/quote, /comment, etc.) defines a function (get_quote,
post_comment, etc.) and uses the cursor to communicate with the database.

Each function then defines a query for the database, executes it, and
stores the data in a variable. Some functions such as get_quote will
repeat this if it needs multiple sets of data.
If the function requires information from the frontend, such as user_id,
comments, etc. this data will be expected in a json format, obtained
using request.get_json() and included in the query.


At the end of each function, they store the data in a json and package that into a response along with the status code.