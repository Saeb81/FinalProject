const express = require('express');
const postgres = require('postgres');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use(function (_, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const port = 3000;

// app.js

PGHOST='ep-young-frog-a5mbncls.us-east-2.aws.neon.tech'
PGDATABASE='final'
PGUSER='saebsobhi81'
PGPASSWORD='8ypxQKd3mtbq'
ENDPOINT_ID='ep-young-frog-a5mbncls'

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

getPgVersion();


app.get('/users', async (_, response) => {
    const user = await sql`select * from users`;
    response.send(user);
});

app.post('/users', async (request, response) => {
    const { user } = request.body
    console.log(request.body);
    const username = await sql`INSERT INTO users (username) VALUES (${user});`;
    response.send(username);
});


app.listen(port, () => console.log(`My App listening at http://localhost:${port}`));