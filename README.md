# TODO APP 
## HOW TO SETUP

 1. Clone the project.
 2. Install dependencies with "npm install".
 3. Configure .env file (like .example.env), you need to set your posgresql url connection, if you don't have postgress, you can run the docker-compose file to create a docker container of postgres.
 4. Run "npx prisma migrate dev", in order to map the datamodel against the database.
 5. run "npm start".

## HOW TO TEST 

 1. Verify jest is installed, if no install it.
 2. run script "npm test".