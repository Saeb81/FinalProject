const express = require('express');
const postgres = require('postgres');
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
PGDATABASE='mid-DB'
PGUSER= 'saebsobhi81'
PGPASSWORD= '8ypxQKd3mtbq'
ENDPOINT_ID='ep-young-frog-a5mbncls'

const sql = postgres({
  host: 'ep-young-frog-a5mbncls.us-east-2.aws.neon.tech',
  database: 'mid-DB',
  username: 'saebsobhi81',
  password: '8ypxQKd3mtbq',
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${'ep-young-frog-a5mbncls'}`,
  },
});

async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

getPgVersion();

app.get('/tweets', async (_, response) => {
    const tweets = await sql`select * from tweets`;
    response.send(tweets);
});

app.post('/tweets', async (request, response) => {
    const { text } = request.body
    console.log(request.body);
    const tweets = await sql`INSERT INTO tweets (text) VALUES (${text});`;
    response.send(tweets);
});


app.listen(port, () => console.log(`My App listening at http://localhost:${port}`));