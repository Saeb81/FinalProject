const express = require('express');

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

app.get('/game', '/library', async (_, response) => {
  const userid = request.body;
  const usergame = await sql`
SELECT game.*
FROM game
INNER JOIN library ON game.id = library.game_id
WHERE library.user_id = ${userid}`;
response.send(usergame);
}

)

app.listen(port, () => console.log(`My App listening at http://localhost:${port}`));