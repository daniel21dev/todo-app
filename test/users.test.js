const app = require('../src/app')
const request = require('supertest')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

describe('POST /users',()=>{

    let userIdToDelete;

    it('should respond with 400 status code',async()=>{
        const res = await request(app).post('/api/v1/users').send()
        expect(res.status).toBe(400);
    })

    it('should respond with 200 status code and user data',async()=>{
        const data = {
            email: 'user1@testing.com',
            name: 'testinguser',
            password: '123456'
        }
        const res = await request(app).post('/api/v1/users').send(data)
        expect(res.status).toBe(200);
        expect(res.body.user.email).toBe(data.email)
        expect(res.body.user.name).toBe(data.name)
        expect(res.body.user.password).not.toBe(data.password)
        userIdToDelete = res.body.user.id;
    });

    afterAll(async()=>{
        await prisma.user.delete({
            where:{id: userIdToDelete}
        })
    })
})