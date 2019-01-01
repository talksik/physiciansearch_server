## Searching for Physicians on a Map (Server-side)

This entire repository is dedicated to the backend portion of the web app. It is a Node.js + Express application, with one primary file (index.js), which handles the database connection, and the REST API with the only one needed endpoint (GET).

### Design Choices
- This separated backend server has many dependencies such as express, cors, body-parser, and mysql, to perform different functions.
- The database is ClearDB, a service within heroku, which is MySQL based. I wanted a relational database because tabular data of physicans from the csv file made the most sense with its distinct column values. Moreover, I knew there were repeats so I set the profile id of the physician as the primary key. I wanted a compact database in MySQL, so I only imported certain columns such as the first, middle, last, address, city, state, and zip_code from the file. 
- From reading the note from the dataset files, I found that it may be useful to only use the file 'OP_DTL_OWNRSHP_PGYR2016_P06292018' simply due to its description of including recipients, most commonly physicans. I looked through the other files and saw that there were many outliers and also repeats from the primary clean dataset in the ownership table. Usually, I would consult with people familiar with the datasets to give me a better understanding of what data is important. 
- The only REST API call available is a get request for the physician location given the name. This entire application can definitely be expanded, using the MVC (model-view-controller) approach with more endpoints created. 

### Note
- I do some fundamental string manipulation to retrieve the correct physician from the table, but of course, there could be alot more done with 'LIKE' statements in SQL. I felt that wasn't the primary focus, so moved on.
- Please take a look at the frontend repository for this project to get a better sense of how the database and backend interact with the user.


### Deployment: https://physiciansearch.herokuapp.com/ 
- Runs on heroku service that easily deploys every time I push to github. 
- The endpoint is: https://physiciansearch.herokuapp.com/physicianloc  |  Needs appropriate params for desired server response
- ClearDB ignite service under heroku add-ons. Can also use PosgreSQL.
