## Running the app

docker-compose up --build

Check:

localhost:3000/users

localhost:3000/tasks


Integration test:

docker-compose -f compose.test.yaml up --build

npm run test:e2e
