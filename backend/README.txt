The database URL is stored in .env

The server attempts to connect to the URL using psycopg2. If successful, it then initializes a cursor as a pointer to the database. Each endpoint (/quote, /comment, etc.) defines a function (get_quote, post_comment, etc.) and uses the cursor to communicate with the database.

Each function then defines a query for the database, executes it, and stores the data in a variable. Some functions such as get_quote will repeat this if it needs multiple sets of data. If the function requires information from the frontend, such as user_id, comments, etc. this data will be expected in a json format, obtained using request.get_json() and included in the query.

At the end of each function, they store the data in a json and package that into a response along with the status code.

GET /get-quote  
Expects a json {"user_id": (int)}  
Returns a json {  
    "quote_id": (int),  
    "quote_content": (string),  
    "author": (string),  
    "tag": (string),  
    "rating": (double),  
    "comments": list of key-value pairs {  
        "user_id": (int),
        "comment_content: (string)
    }
}

GET /get-specific-quote  
Expects a json {"quote_id": (int)}  
Returns a json {  
    "quote_id": (int),  
    "quote_content": (string),  
    "author": (string),  
    "tag": (string),  
    "rating": (double),  
    "comments": list of key-value pairs {  
        "user_id": (int),
        "comment_content: (string)  
    }  
}

PUT /add-favorite  
Expects a json {  
    "user_id": (int),  
    "quote_id": (int)  
}  
Returns a status response, 200: Already exists, 201: Created

GET /get-favorite-quotes  
Expects a json {"user_id": (int)}  
Returns a list of key-value pairs {  
    "quote_id": (int),  
    "quote_content": (string),  
    "author": (string),  
    "tag": (string),  
    "rating": (double),  
    "comments": list of key-value pairs {  
        "user_id": (int),  
        "comment_content: (string)  
    }  
}

DELETE /remove-favorite  
Expects a json {  
    "user_id": (int),  
    "quote_id": (int)  
}  
Returns a status response

POST /add-comment  
Expects a json {  
    "user_id": (int),  
    "quote_id": (int),  
    "comment_content": (string)  
}  
Returns a status response

PUT /add-rating  
Expects a json {  
    "user_id": (int),  
    "quote_id": (int),  
    "rating": (int)  
}  
Returns a status response

PUT /add-tag  
Expects a json {  
    "user_id": (int),  
    "tag": (string)  
}  
Returns a status response

GET /get-tags  
Expects a json {"user_id": (int)}  
Returns a list of strings  

DELETE /remove-tag
Expects a json {  
    "user_id": (int)  
    "tag": (string)  
}  
Returns a status response