# uWell

**Description**<br/>
uWell is a social media application with a theme of general wellness and life enrichment. Users log their *Efforts*, which are activities aimed towards improving themselves as people. Efforts range in scale from fulfilling a daily healthy ritual to achieving a lifelong dream. They can also apply to any aspect of one's well-being: physical health, education, and spirit, for example. <br/>
<br/>
Looking for some inspiration? Like many social media platforms, uWell features a friendship system; users can search for other users and add them as Friends. They can then see their Friends' Effort posts in a single feed. uWell also leverages the power of the Eventbrite API, enabling users to search by category and location to find more opportunities to apply their Efforts. <br/>


**Deployed site**:<br/>
https://uwell.herokuapp.com/


**Setup (local installation)**<br/>
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


**Issues and Potential Future Development**<br/>
uWell is early in development. While the application's core functionality goals have been achieved, users may encounter some bugs/unexpected behaviors while using the site. In addition to finding and addressing these bugs, future development could entail exploring these features: <br/>

* Like/Support system: <br/>
Users would be able to show their support by adding a reaction to their Friends' Efforts. Although the concept is fairly simple, accomplishing this in development poses a non-trivial challenge: we would need some method of associating Effort posts with users so that we could keep track of whether a particular user has already "liked" a particular Effort. <br/>

* Troll control through community policing<br/>
As with any platform for free expression, there is a possibility that individuals will abuse the service by posting offensive content or spam. One approach to monitoring content would be to have an administrative committee review Efforts before they become public, but this would delay the posting process and is unfeasible for a high volume of use. A more efficient (though less surefire) solution would be to enlist the user base by providing some mechanism for users to report posts and some protocol for suppressing reported posts. For example, the site could automatically delete a post once it is reported by a certain number of users. <br/>

* Enhanced event searching functionality<br/>
Currently, users can search for events by choosing an activity category and entering a location. Additional search functionality could allow the user to query using more parameters (like date/time of the event, cost of attendance, recurrence, etc.) or by entering keywords. It would also be helpful to allow users to sort or refine their search results. <br/>
