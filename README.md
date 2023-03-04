# QuickQuotes
CSE 115 Group Project

Instructions on setting up the app:  
Navigate to frontend folder  
Install packages: ```npm install```  
Navigate to screens.js  
Change the URL to the host and port that you are running your server on  
Run server: ```expo start```

Instructions on setting up the server:  
Navigate to backend folder  
Setup virtual environment: ```python3 -m venv venv```  
Start virtual environment: ```. venv/bin/activate```  
If on Windows: ```Set-ExecutionPolicy Unrestricted -Scope Process``` then: ```. venv/Scripts/activate```  
Install requirements: ```pip install -r ./requirements.txt```  
.flaskenv contains environment variables for flask for the app location and debugger settings.  
.env contains environment variables indicating the database URL, retrieved using load_dotenv() from dotenv.    

Run server: ```flask run -h {host} -p {port}```  
Use the host displayed on expo start, any port such as 5000
Refer to README.txt in backend folder for more details.

Run webscraper: python3 webscraper.py  
Note on csv files:  
Csv file will be created in csv folder.  
Each row contains quote followed by author, separated by a comma.  
If the quote contains a comma, it will be enclosed in an additional set of quotations.