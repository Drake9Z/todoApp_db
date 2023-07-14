const express = require('express');

const userRoutes = require('./routes/users.routes')

const initModels = require('./models/initModels');
const db = require("./utils/database");
const Users = require('./models/users.model');
const Todos = require('./models/todos.model');
const Categories =  require('./models/categories.model')
const TodoCategories = require('./models/todo_categories.model')
const {restart} = require('nodemon');

require('dotenv').config();

initModels();

db.sync().then(() => console.log("synchronized database"));

const app = express();
const PORT = process.env.PORT ?? 8000;

  app.use(userRoutes);

//* CREATE USER

app.use(express.json());
app.post('/users', async(req, res) => {
  try{
    const newUser = req.body;
    await Users.create(newUser);
    res.status(201).json();
  }catch(error){
    res.status(400).json(error);
  }
});

//todo READ ALL USERS

app.get('/users', async(req, res) => {
  try {
    const users = await Users.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

//todo READ A SINGLE USER

app.get('/users/:id', async(req, res) => {
  try {
    const {id} = req.params;  
    const user = await Users.findByPk(id);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

//? UPDATE A USER

app.put('/users/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const {name, lastName} = req.body;
    await Users.update({name, lastName}, {
      where: {id}
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});
//!DELETE USER
app.delete('/users/:id', async(req, res) => {
  try {
    const {id} = req.params;
    await Users.destroy({
      where: {id}
    });
    res.send(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});
app.use(express.json());
app.post('/users/:id/todos', async (req, res) => {
  try {
    const { id } = req.params;
    const { newTodo, categories } = req.body;

    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await Todos.create({
      ...newTodo,
      user_id: user.id,
    });

    for (const categoryId of categories) {
      const category = await Categories.findByPk(categoryId);

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      await TodoCategories.create({
        todo_id: todo.id,
        category_id: categoryId,
      });
    }

    res.status(201).json();
  } catch (error) {
    res.status(500).json(error);
  }
});

//todo READ TODOS FROM A USER

/* app.get('/users/:userId/todos', async(req, res) => {
  try {

    const {userId} = req.params;

    const userTodos = await Todos.findAll({
      where: {
        user_id : userId
      }
    });
    res.status(200).json(userTodos);
  } catch (error) {
    res.status(404).json(error);    
  }
}); */

//? UPDATE A TODO THAT BELONGS TO A USER

app.put('/users/:userId/todos/:todoId', async(req, res) => {
  try {
    const {todoId} = req.params;
    const {title, description, completed} = req.body;
    await Todos.update({title, description, completed}, {
      where: {todoId}
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json(error);    
  }
});

// ? EDIT 'COMPLETED' PROPERTY

app.patch('/users/:userId/todos/:todoId/completed', async (req, res) => {
  try {
    const { userId, todoId } = req.params;
    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const todo = await Todos.findOne({
      where: {
        id: todoId,
        user_id: userId,
      },
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
});

//! DELETE A TODO FROM A USER
app.delete('/users/:userId/todos/:todoId', async(req, res) => {
  try {
    const {userId, todoId} = req.params;
    const user = await Users.findByPk(userId);
    const id = todoId;

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    };

    await TodoCategories.destroy({
      where: {todo_id: id}
    })

    await Todos.destroy({
      where: {id}
    });

    res.send(204).send();
    
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to this todo_app server');
});

app.listen(PORT, () => {
  console.log(`Server listenning in port ${PORT}`)
}); 