# QuickQuotes
CSE 115 Group Project

Instructions on setting up the server:  
Ensure that you have the latest version of Python 3 installed  
Navigate to backend/  
Setup virtual environment: ```python -m venv venv```  
Start virtual environment if on Mac/Linux: ```. venv/bin/activate```  
If on Windows: ```Set-ExecutionPolicy Unrestricted -Scope Process``` then: ```. venv/Scripts/activate```  
Install requirements: ```pip install -r ./requirements.txt```  
Run server: ```flask run -h {host} -p {port}```  
Use your ip and select any port, such as port. If you do not know your ip, use the address displayed on expo start or use ipconfig.  

Instructions on setting up the app:  
Navigate to frontend/  
Install packages: ```npm install```  
Navigate to config.js  
Change the URL to the host and port that you are running your server on  
Run app if on Mac/Linux: ```expo start```  
If on Windows: ```Set-ExecutionPolicy Unrestricted -Scope Process``` then: ```expo start```  
Ensure that your mobile device is on the same network as expo  
Scan the QR code with Expo Go  

Instructions on running webscraper:  
Navigate to backend/webscraper/  
Run webscraper: ```python webscraper.py```  
csv files will be created in csv folder.

Instructions on running tests:
Navigate to testing/frontend/  
Install packages: ```npx expo install jest-expo jest -- --legacy-peer-deps```   
Run tests: ```npm run test```
