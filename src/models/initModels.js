const TodoCategories = require('./todo_categories.model');
const Todos = require('./todos.model');
const Users = require('./users.model')
const Categories = require('./categories.model');

const initModels = () => {
    // Users-Todos;
    Todos.belongsTo(Users, {foreignKey: 'user_id'});
    Users.hasMany(Todos, {foreignKey: 'user_id'});
    // Todos-TodoCategories;
    TodoCategories.belongsTo(Todos, {foreignKey: 'todo_id'});
    Todos.hasMany(TodoCategories, {foreignKey: 'todo_id'});
    // TodoCategories-Categories;
    TodoCategories.belongsTo(Categories, {foreignKey: 'category_id'});
    Categories.hasMany(TodoCategories, {foreignKey: 'category_id'});
};

module.exports = initModels;