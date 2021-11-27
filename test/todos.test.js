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
                email: 'user3@testing.com',
                name: 'testinguser',
                password: securePassword
            }
        })
        token = await generateJwt(testingUser.id,'1d')
    })

    it('should respond with an empty array', async () => {
        const res = await request(app)
            .get('/api/v1/todos')
            .set('x-token',token)
            .send()
        expect(res.status).toBe(200)
        expect(res.body.todos.length).toBe(0)
    })

    // deletes the testing user
    afterAll(async () => {
        await prisma.user.delete({
            where: { id: testingUser.id }
        })
    })
})