const Categories = require('../models/categories.model');
const TodoCategories = require('../models/todo_categories.model');
const Todos = require('../models/todos.model');
const Users = require('../models/users.model');

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findOne({
            where: { id },
            attributes: {
                exclude: ["password"],
            },
            include: {
                model: Todos,
                attributes: {
                    exclude: ["user_id", "createdAt", "updatedAt"],
                },
                include: {
                    model: TodoCategories,
                    attributes: {
                        exclude: ["category_id", "todo_id"],
                    },
                    include: {
                        model: Categories,
                    },
                }
            },
        });
        res.json(user);
    } catch (error) {
        res.status(400).json(error);
    }
};


module.exports = {
    getUserById
};