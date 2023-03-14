# QuickQuotes
CSE 115 Group Project

Instructions on setting up the app:  
Navigate to frontend folder  
Install packages: ```npm install```  
Navigate to config.js  
Change the URL to the host and port that you are running your server on  
Run app: ```expo start```  
If on Windows: ```Set-ExecutionPolicy Unrestricted -Scope Process``` then: ```expo start```  

Instructions on setting up the server:  
Navigate to backend folder  
Setup virtual environment: ```python3 -m venv venv```  
Start virtual environment: ```. venv/bin/activate```  
If on Windows: ```Set-ExecutionPolicy Unrestricted -Scope Process``` then: ```. venv/Scripts/activate```  
Install requirements: ```pip install -r ./requirements.txt```  
.flaskenv contains environment variables for flask for the app location and debugger settings.  
.env contains environment variables indicating the database URL, retrieved using load_dotenv() from dotenv.    

Run server: ```flask run -h {host} -p {port}```  
Use your ip and select any port, such as port. If you do not know your ip, use the address displayed on expo start.  

Run webscraper: ```python3 webscraper.py```  
csv file will be created in csv folder.

Instructions on setting up the tests:
Navigate to frontend folder
Install packages: ```npx expo install jest-expo jest -- --legacy-peer-deps```
Run tests: ```npm run test```