const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getTodos = async(req,res)=>{
    const {
        sortDirection='desc',
        pageLenght=10,
        page=0
    } = req.query;
    try {
        const todos = await prisma.todo.findMany({
            where:{
                userId: req.user.id,
                active: true,
            },
            orderBy:{
                createdAt: sortDirection
            },
            skip: Number(pageLenght) * Number(page),
            take: Number(pageLenght),
        });
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

const updateTodo = async(req,res)=>{
    const {id} = req.params;
    const {title,content,completed,dueDate} =req.body
    try {
        const todo = await prisma.todo.update({
            where:{
                id: Number(id)
            },
            data:{
                title,
                content,
                completed,
                dueDate: new Date(dueDate)
            }
        })
        res.json({todo});
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
}

const deleteTodo = async(req,res)=>{
    const {id} = req.params;
    try {
        const todo = await prisma.todo.update({
            where:{
                id: Number(id)
            },
            data:{
                active: false
            }
        })
        res.json({msg: 'successful deleted!'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
}

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}