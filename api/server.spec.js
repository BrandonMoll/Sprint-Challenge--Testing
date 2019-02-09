const request = require('supertest');
const server = require('./server.js');
const knex = require('knex');
const dbConfig = require('../knexfile')
const db = knex(dbConfig.development);

describe('The post requests', () => {
    afterEach(async () => {
        await db('games').truncate();
    })
    it('responds with 201', async () => {
        const body = { title: 'pacman', genre: 'Arcade', releaseYear: 1980 }
        const response = await request(server).post('/').send(body);
        expect(response.status).toBe(201);
    });

    it('responds with 422 when missing data', async () => {
        const body = {};
        const response = await request(server).post('/').send(body);
        expect(response.status).toBe(422);
    });

    it('responds with json', async () => {
        const body = { title: 'Asteroids', genre: 'Arcade' }
        const response = await request(server).post('/').send(body);
        expect(response.type).toMatch(/json/i);
    });
});

describe('The get request', () => {
    it('responds with 200', async () => {
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
    });

    it('responds with json', async () => {
        const response = await request(server).get('/');
        expect(response.type).toMatch(/json/i);
    });

    it('returns an object?', async () => { 
        const response = await request(server).get('/');
        expect(typeof(response.body)).toMatch(/object/i); 
        
    })
})