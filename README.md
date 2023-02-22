# QuickQuotes
CSE 115 Group Project

Setup virtual environment: python3 -m venv venv

Start virtual environment: . venv/bin/activate

Install requirements: pip install -r requirements.txt

.flaskenv contains environment variables for flask for the app location and debugger settings.

.env contains environment variables indicating the database URL, retrieved using load_dotenv() from dotenv.

Run server: python3 -m flask run

Note on testing the server:
Use an application such as Insomnia, Postman, or Curl to send requests, as the browser is only able to send GET requests.

Run webscraper: python3 webscraper.py

Note on csv files:
Csv file will be created in csv folder.
Each row contains quote followed by author, separated by a comma.
If the quote contains a comma, it will be enclosed in an additional set of quotations.