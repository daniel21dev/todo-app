const app = require('../src/app')
const request = require('supertest')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
const { generateJwt } = require('../src/helpers/generteJwt')

describe('/todos', () => {
    // declares a testing user in order to test the login
    let testingUser;
    let token;
    beforeAll(async () => {
        const salt = bcrypt.genSaltSync(10);
        const securePassword = bcrypt.hashSync('123456', salt);
        testingUser = await prisma.user.create({
            data: {
                email: 'user4@testing.com',
                name: 'testinguser',
                password: securePassword
            }
        })
        token = await generateJwt(testingUser.id, '1d')
    })

    it('should respond with 401 status', async () => {
        const res = await request(app)
            .get('/api/v1/todos')
            .send()
        expect(res.status).toBe(401)
    })

    it('should respond with an empty array', async () => {
        const res = await request(app)
            .get('/api/v1/todos')
            .set('x-token', token)
            .send()
        expect(res.status).toBe(200)
        expect(res.body.todos.length).toBe(0)
    })

    it('should create a todo', async () => {
        const data = {
            title: 'todo title',
            content: "i dont know",
            dueDate: new Date().toISOString()
        }
        const res = await request(app)
            .post('/api/v1/todos')
            .set('x-token', token)
            .send(data)
        expect(res.status).toBe(200)
        expect(res.body.todo.title  ).toBe(data.title)
        expect(res.body.todo.content).toBe(data.content)
        expect(res.body.todo.dueDate).toBe(data.dueDate)
    })

    // deletes the testing user
    afterAll(async () => {
        await prisma.user.delete({
            where: { id: testingUser.id }
        })
    })
})