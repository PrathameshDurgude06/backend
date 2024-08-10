const express = require('express');
const router = express.Router();
const db = require('../db/dbconnect');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');


//to get all courses
router.get("/courses", function(req,res){
  db.query("select * from courses",function(err,data,fields){
    if(err){
      res.status(500).send("data not found")
    }
    else{
      res.json(data)
    }
  })
})



//get single object
router.get("/courses/:id",function(req,res){
  db.query("select * from courses where cid=?",[req.params.id],function(err,data,fields){
    if(err){
      res.status(500).send("data not found")
    }
    else{
      res.json(data)
    }
  })
})


// Add a new course
router.post('/courses/add', function(req, res){
  db.query('insert into courses (cname, fees, duration) values (?, ?, ?)',
  [req.body.cname, req.body.fees, req.body.duration], function(err, result){
    if (err){
      res.status(500).send("data not inserted")}
      else{
    res.status(200).send('Course added successfully')
   }
})
})



// Update a new course
router.put('/courses/:id', function(req, res){
  db.query("update courses set cname=?, fees=?, duration=? where cid=?",
  [req.body.cname, req.body.fees, req.body.duration,req.params.id], function(err, result){
    if (err){
      res.status(500).send("data not found")}
      else{
    res.status(200).send('Course updated successfully')
   }
})
})




//delete the  object in the database
router.delete("/courses/:id",function(req,res){
  db.query("delete from courses where cid=?",[req.params.id],function(err,data,fields){
     if(err){
         res.status(500).send("data not deleted")
     }
     else{
         //will return the data in json format
         res.status(200).send("data deleted succesfully!!")
     }
  })
})

module.exports = router;

/*const SECRET_KEY = 'your_secret_key';

router.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM user WHERE email = ?';

  db.query(query, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result[0];
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  });
});



// Fetch all courses
router.get('/courses', (req, res) => {
  const query = 'SELECT * FROM courses';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new course
router.post('/courses', (req, res) => {
  const { cname, fees, duration } = req.body;
  const query = 'INSERT INTO courses (cname, fees, duration) VALUES (?, ?, ?)';
  db.query(query, [cname, fees, duration], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Course added successfully' });
  });
});

// Update a course
router.put('/courses/:id', (req, res) => {
  const { id } = req.params;
  const { cname, fees, duration } = req.body;
  const query = 'UPDATE courses SET cname = ?, fees = ?, duration = ? WHERE id = ?';
  db.query(query, [cname, fees, duration, id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Course updated successfully' });
  });
});

// Delete a course
router.delete('/courses/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM courses WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Course deleted successfully' });
  });
});

module.exports = router;
*/