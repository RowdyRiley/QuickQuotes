from flask import Flask, jsonify, make_response, request
from dotenv import load_dotenv
import psycopg2
import os

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
@app.get("/quote")
def get_quote():
    with conn:
        with conn.cursor() as cursor:

            # Define Query to get random quote
            QUERY = '''SELECT * FROM quotes
                       WHERE id NOT IN (SELECT quote_id FROM user_quotes_seen)
                       ORDER BY random()
                       LIMIT 1;'''

            # Execute Query
            cursor.execute(QUERY)
            quote = cursor.fetchone()
            quote_id = quote[0]

            # Define Query to get comments associated with the quote
            QUERY = f'''SELECT * FROM comments
                        WHERE quote_id={quote_id};'''

            # Execute Query
            cursor.execute(QUERY)
            comments = cursor.fetchall()

            # Define Query to insert quote user has seen
            user_id = 1             # Placeholder until user profiles set up
            quote_id = quote[0]
            QUERY = f'''INSERT INTO user_quotes_seen (user_id, quote_id)
                        VALUES ({user_id}, {quote_id});'''

            # Execute Query
            cursor.execute(QUERY)

    # Form response
    response = make_response(jsonify(quote, comments), 200)
    
    # Success, return response
    return response

# Get a specific quote, return quote and comments
@app.get("/specific")
def get_specific_quote():

    # Request data from the frontend as a json
    data = request.get_json()
    quote_id = data["quote_id"]

    with conn:
        with conn.cursor() as cursor:

            # Define Query to get a specific quote
            QUERY = f'''SELECT * FROM quotes
                        WHERE id={quote_id};'''

            # Execute Query
            cursor.execute(QUERY)
            quote = cursor.fetchone()

            # Define Query to get comments associated with the quote
            QUERY = f'''SELECT * FROM comments
                        WHERE quote_id={quote_id};'''

            # Execute Query
            cursor.execute(QUERY)
            comments = cursor.fetchall()

    # Form response
    response = make_response(jsonify(quote, comments), 200)

    # Success, return response
    return response

# Favorite a quote
@app.put("/favorite")
def favorite_quote():
    return

# Post comment
@app.post("/comment")
def post_comment():

    # Request data from the frontend as a json
    data = request.get_json()
    content = data["content"]
    quote_id = data["quote_id"]
    user_id = data["user_id"]

    with conn:
        with conn.cursor() as cursor:

            # Define Query to add comment
            QUERY = f'''INSERT INTO "comments" (content, quote_id, user_id)
                        VALUES ('{content}', {quote_id}, {user_id});'''

            # Execute Query
            cursor.execute(QUERY)

    # Form response
    response = make_response("Success", 201)

    # Success, return response
    return response

# Put rating; Each user may only have 1 rating per quote
@app.put("/rating")
def put_rating():
    return