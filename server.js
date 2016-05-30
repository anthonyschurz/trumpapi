// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.json({ message: "TrumpAPI: Make APIs Great Again. Learn more at TrumpAPI.com."})
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {

   var term = req.query.task;

   for (i = 0; i < length.todos; i++) {
      if (term == todos[i].task) {
        res.json(todos[i]);
      } else {
        console.log("we couldn't find any results")
      }
   };
});



app.get('/api/todos', function index(req, res) {
   res.json({ todos: todos });
});

app.post('/api/todos', function create(req, res) {
  var newTodo = req.body;

  if (todos.length > 0) {
    newTodo._id = todos[todos.length - 1]._id + 1;
  } else {
    newTodo._id = 1;
  }

  todos.push(newTodo);
  res.json(newTodo);
});

app.get('/api/todos/:id', function show(req, res) {
  for (var i = 0; i < todos.length; i++) {
    if (req.params.id == todos[i]._id) {
      res.json(todos[i]);
    }
  }
});

app.put('/api/todos/:id', function update(req, res) {
   var updID = req.params.id;
   var updTodo = req.body;

   for (var i = 0; i < todos.length; i++) {
     if (updID == todos[i]._id) {
       updTodo._id = todos[i]._id;
       todos[i] = updTodo;
     } else {
       console.log("ID not found");
     }
   }
res.json(updTodo);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  var destID = req.params.id;
  for (var i = 0; i < todos.length; i++) {
    if (destID == todos[i]._id) {
      todos.splice(i, 1);
    } else {
      console.log("ID not found");
    }
  }
  res.json({ todos: todos })
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
