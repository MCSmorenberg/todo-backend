const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Enable CORS --> is a mechanism that uses additional HTTP headers to let a user agent gain permission.
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/todo', function(req, res, nextMiddleWare){
  // res.send({type:'GET'});
  Todo.find().then(function(todos){
    res.send(todos);
  }).catch(nextMiddleWare);
});

// Add new todo
router.post('/todo', function(req, res, nextMiddleWare){
  console.log(req.body);

  // var todo = new Todo(req.body);
  // todo.save();
  // Mongoose method for this is:
  Todo.create(req.body).then(function(todo){
    res.send(todo);
  }).catch(nextMiddleWare);

  // res.send({
  //   type:'POST',
  //   todo: req.body.todo
  // });
});

// Update todo
router.put('/todo/:id', function(req, res, nextMiddleWare){
  Todo.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    Todo.findOne({_id: req.params.id}).then(function(todo){
      res.send(todo);
    });
  });
  // res.send({type:'PUT'});
});

router.delete('/todo/:id', function(req, res, nextMiddleWare){
  // console.log(req.params.id);

  // Another mongoose method
  Todo.findByIdAndRemove({_id: req.params.id}).then(function(todo){
    res.send(todo);
  })
  // res.send({type:'DELETE'});
});

module.exports = router;
