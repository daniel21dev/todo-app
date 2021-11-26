const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getTodos = async(req,res)=>{
    try {
        const todos = await prisma.todo.findMany({});
        res.json({todos});
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
}

const createTodo = async(req,res)=>{
    const {title,content,dueDate} = req.body;
    try {
        const todos = await prisma.todo.create({
            data:{
                title,
                content,
                dueDate: new Date(dueDate),
                user:{connect:{id: req.user.id}}
            }
        })
        res.json({todos});
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
}

module.exports = {
    getTodos,
    createTodo
}