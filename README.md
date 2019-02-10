uWell

**Description**<br/>
uWell is a social media application with a theme of general wellness and life enrichment. More to come...<br/>


**Deployed site**:<br/>
https://uwell.herokuapp.com/


**Setup**<br/>
Although uWell is deployed to Heroku, it can also be installed and run locally (with the user's computer as a server) through the Command Line Interface (CLI). NodeJS, a SQL environment (such as MySQL Workbench), and API keys for Firebase and Eventbrite are required. The user will also have to create two files to contain their private credentials; these files are listed in the ".gitignore" file so that these data are protected from public exposure. <br/>

1. Clone this repository to your computer. 
2. Create the file "devConfig.json" in the config/ folder. Paste the below text in the file and modify the "username", "password", and "host" values according to your SQL environment's credentials. 

```javascript
{
    "username": "root",
    "password": "mySQLpassword",
    "database": "well_db",
    "host": "localhost",
    "dialect": "mysql"
}
```

3. Create the file ".env" at the root directory and paste in your Firebase and Eventbrite API keys. 
4. In the CLI, navigate to your local repository and run `npm install` to install the requisite node_modules.
5. Run `node server.js` to get the server running. 
6. Visit http://localhost:3000/ in a Web browser. 

**Using the application**<br/>
More to come...