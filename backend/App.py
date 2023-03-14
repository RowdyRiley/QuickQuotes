from flask import Flask, jsonify, make_response, request
from dotenv import load_dotenv
import psycopg2
import os

from utils.QueryUtils import *
from utils.JsonUtils import *

# Define flask app
app = Flask(__name__)

# Load environment variables
load_dotenv()

# Connect to the database by URL
url = os.getenv("DATABASE_URL")
conn = psycopg2.connect(url)

# Initialize cursor
cursor = conn.cursor()

# Get a random quote that user hasn't seen, add it to seen list, return quote and comments
@app.post("/get-quote")
def get_quote():

    # Request data from the frontend as a json
    data = request.get_json()
    user_id = data["user_id"]

    with conn:
        with conn.cursor() as cursor:

            # Define Query to get random quote the user hasn't seen
            QUERY = f'''SELECT * FROM quotes q
                        INNER JOIN tags t ON q.tag_name = t.name
                        WHERE q.id NOT IN (SELECT quote_id FROM user_quotes_seen 
                                           WHERE user_id = %s)
                        AND t.name IN (SELECT tag_name FROM user_tags 
                                       WHERE user_id = %s)
                        ORDER BY random()
                        LIMIT 1;'''

            # Execute Query
            query_input = (user_id, user_id)
            cursor.execute(QUERY, query_input)
            row = cursor.fetchone()

            # Check if any data was returned
            if row is None:
                return make_response("No quotes found", 204)

            # Turn quote into json format
            quote = construct_quote_json(row)
            quote_id = quote["quote_id"]

            # Define Query to get comments associated with the quote
            QUERY = f'''SELECT * FROM comments
                        WHERE quote_id=%s;'''

            # Execute Query
            query_input = (quote_id,)
            cursor.execute(QUERY, query_input)
            rows = cursor.fetchall()
            comments = construct_comment_json(rows)

            # Define Query to insert quote user has seen
            QUERY = f'''INSERT INTO user_quotes_seen (user_id, quote_id)
                        VALUES ('{user_id}', {quote_id})
                        ON CONFLICT (user_id, quote_id) DO NOTHING;'''

            # Execute Query
            cursor.execute(QUERY)

    # Form response
    response = make_response(json_add(quote, comments, "comments"), 200)
    return response

# Get a specific quote, return quote and comments
@app.post("/get-specific-quote")
def get_specific_quote():

    # Request data from the frontend as a json
    data = request.get_json()
    quote_id = data["quote_id"]

    with conn:
        with conn.cursor() as cursor:

            # Define Query to get a specific quote
            QUERY = f'''SELECT * FROM quotes
                        WHERE quotes.id=%s;'''
            # Execute Query
            query_input = (quote_id,)
            cursor.execute(QUERY, query_input)
            row = cursor.fetchone()

            # Check if any data was returned
            if row is None:
                return make_response("No quotes found", 204)

            # Turn quote into json format
            quote = construct_quote_json(row)

            # Define Query to get comments associated with the quote
            QUERY = f'''SELECT user_id, content FROM comments
                        WHERE quote_id=%s;'''

            # Execute Query
            query_input = (quote_id,)
            cursor.execute(QUERY, query_input)
            rows = cursor.fetchall()
            comments = construct_comment_json(rows)
            

    # Form response
    response = make_response(json_add(quote, comments, "comments"), 200)
    return response

# Add a quote to user list of favorites
@app.put("/add-favorite")
def favorite_quote():

    # Request data from the frontend as a json
    data = request.get_json()
    quote_id = data["quote_id"]
    user_id = data["user_id"]

    with conn:
        with conn.cursor() as cursor:
            
            # Define a query to add a quote to user favorites
            QUERY = f'''INSERT INTO user_quotes_favorited (user_id, quote_id)
                        VALUES (%s, %s)
                        ON CONFLICT (user_id, quote_id) DO NOTHING
                        RETURNING *'''

            # Execute query
            query_input = (user_id, quote_id)
            cursor.execute(QUERY, query_input)

            # Check if row was inserted
            row = cursor.fetchone()
            if row is None:
                return make_response("Already exists", 200)


    # Form response
    response = make_response("Created", 201)
    return response

# Return a list of quotes favorited by user
@app.post("/get-favorite-quotes")
def get_favorite_quotes():

    # Request data from the frontend as a json
    data = request.get_json()
    user_id = data["user_id"]

    with conn:
        with conn.cursor() as cursor:

            # Define query to retrieve list of quotes
            QUERY = f'''SELECT * FROM quotes
                        WHERE quotes.id IN (SELECT quote_id FROM user_quotes_favorited
                                            WHERE user_id=%s)'''
            
            # Execute query
            query_input = (user_id,)
            cursor.execute(QUERY, query_input)
            rows = cursor.fetchall()

            # Check if any data was returned
            if rows is None:
                return make_response("No quotes found", 204)

            # Form list of quotes in json format
            quotes = construct_quote_list(rows)

            # Retrieve comments for each quote
            for quote in quotes:
                quote_id = quote["quote_id"]

                # Define query to retrieve comments from a quote
                QUERY = f'''SELECT * FROM comments
                            WHERE user_id=%s AND quote_id=%s'''

                # Execute query
                query_input = (user_id, quote_id)
                cursor.execute(QUERY, query_input)
                rows = cursor.fetchall()
                comments = construct_comment_json(rows)
                quote["comments"] = comments
            
    # Form response
    response = make_response(quotes, 200)        
    return response

# Remove a quote from user list of favorites
@app.delete("/remove-favorite")
def remove_favorite_quote():

    # Request data from the frontend as a json
    data = request.get_json()
    user_id = data["user_id"]
    quote_id = data["quote_id"]

    with conn:
        with conn.cursor() as cursor:

            # Define query to remove quote from user favorites
            QUERY = f'''DELETE FROM user_quotes_favorited
                        WHERE user_id = %s AND quote_id = %s
                        RETURNING *;'''

            # Execute query
            query_input = (user_id, quote_id)
            cursor.execute(QUERY, query_input)
            row = cursor.fetchone()
            
            # Check if any data was returned
            if row is None:
                return make_response("No content", 204)

    # Form response
    response = make_response("OK", 200)
    return response

# Post comment
@app.post("/add-comment")
def add_comment():

    # Request data from the frontend as a json
    data = request.get_json()
    comment_content = data["comment_content"]
    quote_id = data["quote_id"]
    user_id = data["user_id"]

    with conn:
        with conn.cursor() as cursor:

            # Define Query to add comment
            QUERY = f'''INSERT INTO "comments" (content, quote_id, user_id)
                        VALUES (%s, %s, %s);'''

            # Execute Query
            data = (comment_content, quote_id, user_id)
            cursor.execute(QUERY, data)

    # Form response
    response = make_response("Created", 201)
    return response

# Put rating; Each user may only have 1 rating per quote
@app.put("/modify-rating")
def add_rating():

    # Request data from the frontend as a json
    data = request.get_json()
    user_id = data["user_id"]
    quote_id = data["quote_id"]
    rating = data["rating"]

    with conn:
        with conn.cursor() as cursor:

            # Define query to update rating for a quote
            QUERY = f'''INSERT INTO ratings (user_id, quote_id, score)
                        VALUES (%s, %s, %s)
                        ON CONFLICT (user_id, quote_id) DO UPDATE
                        SET score=%s'''

            # Execute query
            query_input = (user_id, quote_id, rating, rating)
            cursor.execute(QUERY, query_input)

            # Define query to update quote rating with new average
            QUERY = f'''UPDATE quotes
                        SET rating= (
                            SELECT AVG(score) FROM ratings
                            WHERE quote_id={quote_id}
                        )
                        WHERE id={quote_id}'''

            # Execute query
            cursor.execute(QUERY)

    # Form response
    response = make_response("OK", 200)
    return response

# Add a saved tag for user
@app.put("/add-tag")
def add_tag():

    # Request data from the frontend as a json
    data = request.get_json()
    user_id = data["user_id"]
    tag = data["tag"]

    with conn:
        with conn.cursor() as cursor:

            # Define query to add save a tag to the user tags
            QUERY = f'''INSERT INTO user_tags (user_id, tag_name)
                        VALUES (%s, %s)
                        ON CONFLICT (user_id, tag_name) DO NOTHING
                        RETURNING *'''

            # Execute query
            query_input = (user_id, tag)
            cursor.execute(QUERY, query_input)
            row = cursor.fetchone()

            # Check if any data was returned
            if row is None:
                return make_response("Already exists", 200)

    # Form response
    response = make_response("Created", 201)
    return response

# Get all saved tags for user
@app.post("/get-tags")
def get_tags():
    
    # Request data from the frontend as a json
    data = request.get_json()
    user_id = data["user_id"]

    with conn:
        with conn.cursor() as cursor:

            # Define query to retrieve list of quotes
            QUERY = f'''SELECT * FROM tags
                        WHERE name IN (SELECT tag_name FROM user_tags
                                       WHERE user_id=%s)'''
            
            # Execute query
            query_input = (user_id,)
            cursor.execute(QUERY, query_input)
            rows = cursor.fetchall()

            # Check if any data was returned
            if rows is None:
                return make_response("No tags found", 204)

            # Form list of tags in json format
            tags = construct_tag_list(rows)
            
    # Form response
    response = make_response(jsonify(tags), 200)
    return response

# Remove a tag from list of saved tags for user
@app.delete("/remove-tag")
def remove_tag():

    # Request data from the frontend as a json
    data = request.get_json()
    user_id = data["user_id"]
    tag = data["tag"]

    with conn:
        with conn.cursor() as cursor:

            # Define query to remove quote from user favorites
            QUERY = f'''DELETE FROM user_tags
                        WHERE user_id = %s AND tag_name = %s
                        RETURNING *;'''

            # Execute query
            query_input = (user_id, tag)
            cursor.execute(QUERY, query_input)
            row = cursor.fetchone()

            # Check if any data was returned
            if row is None:
                return make_response("No quotes found", 204)

    # Form response
    response = make_response("OK", 200)
    return response

@app.get("/get-all-tags")
def get_all_tags():

    with conn:
        with conn.cursor() as cursor:

            # Define query to retrieve list of quotes
            QUERY = f'''SELECT * FROM tags'''
            
            # Execute query
            cursor.execute(QUERY)
            rows = cursor.fetchall()

            # Check if any data was returned
            if rows is None:
                return make_response("No tags found", 204)

            # Form list of tags in json format
            tags = construct_tag_list(rows)
            
    # Form response
    response = make_response(tags, 200)
    return response

# Add a user to the database
@app.put("/add-user")
def add_user():

    # Request data from the frontend as a json
    data = request.get_json()
    user_id = data["user_id"]

    with conn:
        with conn.cursor() as cursor:

            # Define query to add save a tag to the user tags
            QUERY = f'''INSERT INTO users (user_id)
                        VALUES (%s)
                        ON CONFLICT (user_id) DO NOTHING
                        RETURNING *;'''

            # Execute query
            query_input = (user_id,)
            cursor.execute(QUERY, query_input)
            row = cursor.fetchone()

            # Check if any data was returned
            if row is None:
                return make_response("Already exists", 200)

    # Form response
    response = make_response("Created", 201)
    return response