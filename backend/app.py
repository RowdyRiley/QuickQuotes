from flask import Flask, jsonify, make_response
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

# Gets a random quote that user hasn't seen, adds it to seen list, returns quote
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
            results = cursor.fetchone()

            # Define Query to insert quote user has seen
            user_id = 1
            quote_id = results[0]
            QUERY2 = f'''INSERT INTO user_quotes_seen (user_id, quote_id)
                        VALUES ({user_id}, {quote_id})'''

            # Execute Query
            cursor.execute(QUERY2)

            # Form response
            response = make_response(jsonify(results), 200)
    
    # Success, return quote
    return response