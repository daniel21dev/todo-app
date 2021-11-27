const app = require('../src/app')
const request = require('supertest')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

describe('POST /users', () => {
    // declares a testing user in order to test the login
    let testingUser;
    beforeAll(async () => {
        testingUser = await prisma.user.create({
            data: {
                email: 'user@testing.com',
                name: 'testinguser',
                password: '123456'
            }
        })
    })

    it('should respond with 400 status code', async () => {
        const res = await request(app).post('/api/v1/login').send()
        expect(res.status).toBe(400);
    })

    it('should respond with 500 status code', async () => {
        const res = await request(app).post('/api/v1/login').send({
            email: 'user@testing.com',
            password: 'incorrectpassword'
        })
        expect(res.status).toBe(500);
    })

    // deletes the testing user
    afterAll(async () => {
        await prisma.user.delete({
            where: { id: testingUser.id }
        })
    })
})