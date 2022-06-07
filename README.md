# screeps-market-history

A node app to get a large chunk of recent screeps user market data. This data is usually found in the history tab on screeps and contains a users transactions. This will be take a specified number of pages and convert them into spreadsheet data to make viewing transaction history easier.

Use npm install to set up project locally, requires node and npm

Once installed create a file called .env and populate as follows:
SCREEPS_TOKEN = <insert your screeps API token here>
USER = <insert your screeps user id here - a string of random letters and numbers, can be found using developer console and inspecting network requests when logged in to screeps on a browser>
 
Run index.js, this will run the scraping of your user history for market transactions. This will be converted to a JSON and csv file once done. The csv file can be uploaded to any spreadsheet software, google sheets is free to use and has been tested
  It is worth turning off rate limiting while you do the scraping, do this on the page where you get your API token on screeps
