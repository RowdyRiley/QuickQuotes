from flask import Flask
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

# Test query, returns a random quote
@app.get("/")
def get_quote():
    with conn:
        with conn.cursor() as cursor:

            # Define Query
            QUERY = '''SELECT *
                       FROM quotes
                       ORDER BY random()
                       LIMIT 1;'''

            # Execute Query
            cursor.execute(QUERY)
            results = cursor.fetchall()
    
    # Success, return quote
    return results, 200