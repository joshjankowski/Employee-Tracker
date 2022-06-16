const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// Requiring packages 
const path = require('path');
// Path is a second module

const app = express();
const PORT = 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'employee_db'
    },);

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log(`Connected to the employee_db database.`);
});

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE employee_db'
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send('Database created...')
    })
})

app.get('/departments', (req, res) => {
    const departments = db.query('SELECT * FROM employee_db', function (err, results) {
        return results;
      });
      res.send(departments)
})

// app.get('/', (req, res) => res.send('Navigate to /send or /routes'));
// // .get defines the route - it initializes and creates the route.
// // .get is a function - needs to have arguments of string and function

// app.get('/send', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/sendFile.html'))
// );
// // defines the routes that you can use for fetch


app.use((req, res) => {
    res.status(404).end();
  });  

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
