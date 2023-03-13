# QuickQuotes
CSE 115 Group Project

Instructions on setting up the app:  
Navigate to frontend folder  
Install packages: ```npm install```  
Navigate to config.js  
Change the URL to the host and port that you are running your server on  
Run app if on Mac/Linux: ```expo start```  
If on Windows: ```Set-ExecutionPolicy Unrestricted -Scope Process``` then: ```expo start```  

Instructions on setting up the server:  
Navigate to backend folder  
Setup virtual environment: ```python -m venv venv```  
Start virtual environment if on Mac/Linux: ```. venv/bin/activate```  
If on Windows: ```Set-ExecutionPolicy Unrestricted -Scope Process``` then: ```. venv/Scripts/activate```  
Install requirements: ```pip install -r ./requirements.txt```  
Run server: ```flask run -h {host} -p {port}```  
Use your ip and select any port, such as port. If you do not know your ip, use the address displayed on expo start.  

Run webscraper: ```python webscraper.py```  
csv file will be created in csv folder.