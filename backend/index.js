const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
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
const postgres = require('postgres');



const sql = postgres({
  host: 'ep-young-frog-a5mbncls.us-east-2.aws.neon.tech',
  database: 'final',
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


app.get('/users', async (_, response) => {
  const user = await sql`select * from users`;
  response.send(user);
});

app.post('/users', async (request, response) => {
  const { user_id, username, email, age, password } = request.body;
  console.log(request.body);

  const user = await sql`
    INSERT INTO users (user_id, username, email, password, age, admin)
    VALUES (${user_id}, ${username}, ${email}, ${password}, ${age}, false)
    RETURNING user_id, username, email, age;`;

  response.send(user);
});

app.get('/library', async (_, response) => {
  const library = await sql`select * from library`;
  response.send(library);
});


app.get('/game', async (_, response) => {
  const game = await sql`select * from game`;
  response.send(game);
}

)
app.get('/view', async (request, response) => {
  const userId = request.query.userId;
  console.log(request.query);
  console.log(request.body);
  console.log("-------------------");
  console.log(userId);

  try {
    const userGames = await sql`
      SELECT *
      FROM "view"
      WHERE user_id = ${userId}
    `;

    response.send(userGames);
  } catch (error) {
    console.error('Error fetching data:', error);
    response.status(500).send('Internal Server Error');
  }
});

app.get('/title', async (request, response) => {
  try {
    const search = request.query.search;
    search.toUpperCase;
    console.log(search);
    console.log(request.query.search);

    const titles = await sql`SELECT * FROM title WHERE title LIKE '%' || ${search} || '%'`;
    console.log(titles);
    response.send(titles);
  } catch (error) {
    response.status(500).send(error.message);
  }
});

app.get('/comments', async (response) => {
  try {
    const comments = await sql `SELECT * FROM comments`;
    response.send(comments);
  } catch (error) {

  }
});



app.listen(port, () => console.log(`My App listening at http://localhost:${port}`));