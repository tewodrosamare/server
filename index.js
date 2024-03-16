// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const pool = require('./dbc');

// Create an Express application
const app = express();

// Use body-parser middleware to parse incoming JSON data
app.use(bodyParser.json());
app.use(cors());


// Define GET endpoint to fetch all users
app.get('/api/users', (req, res) => {
    pool.query('select * from user ' ,(err,result)=>{
        res.send(result);
    })
  
});

app.post('/api/user',(req,res,next) => {

    const { name, email}=req.body

    pool.query('INSERT INTO user (name, email) VALUES (?, ?)', [name, email], (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).send('Internal Server Error');
        }
        res.status(201).json({ message: 'User created successfully', userId: results.insertId });
      });
    
})
app.put('/update',(req,res)=>{
    const sql=`UPDATE  user  SET   name = ? , email =? WHERE  id = ?}`
    const { id,name, email}=req.body
    pool.query(sql,[name,email,id],(err,resul)=>{
if(err){
      res.status(500).send('Internal Server Error');
}else{
    res.status(201).send({ message: 'User update successfully', userId: resul.insertId });
}
    })
})

// Start the server and listen on port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
