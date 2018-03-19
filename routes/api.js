const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

router.get('/todo', function(req, res, nextMiddleWare){
  res.send({type:'GET'});
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
