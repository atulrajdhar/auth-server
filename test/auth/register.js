process.env.NODE_ENV = 'test';

require('dotenv').config();

const chai = require('chai');
const chaiHttp = require( 'chai-http');

const mongoose = require('mongoose');
const { MongoMemoryServer} = require('mongodb-memory-server');

const auth = require('../../controllers/auth');
const User = require('../../models/user');
const app = require('../../app');


chai.should();
chai.use(chaiHttp);

let mongoServer;

describe('auth register', () => {    
    before( async () => {
        mongoServer = new MongoMemoryServer();
        const mongoUri = await mongoServer.getUri();
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });        
    });

    after( async () => {
        await mongoose.disconnect();
        await mongoServer.stop();                  
    });

    it('should verify all required inputs are specified', (done) => {
        let users = [
            null,
            {"email": "abc@xyz.com"},
            {"password": "abcdef"}
        ];
        users.forEach(user => {
            chai.request(app)
            .post('/auth/register')
            .send(user)
            .end((err, res) => {
                const body = res.body;                
                res.should.have.status(422);
                body.should.be.a('object');
                body.should.have.property('error').property('status').eq(res.status);
                body.should.have.property('error').property('message');
            }); 
        });
        done();       
    });
    it('should validate email', (done) => {
        let users = [
            {"email": null, "password": "abcdef"},
            {"email": "", "password": "abcdef"},
            {"email": "abc", "password": "abcdef"},
            {"email": "abccom", "password": "abcdef"},
            {"email": "abc.com", "password": "abcdef"},
            {"email": "abc@xyz", "password": "abcdef"},
        ];
        users.forEach(user => {
            chai.request(app)
            .post('/auth/register')
            .send(user)
            .end((err, res) => {
                const body = res.body;
                res.should.have.status(422);
                body.should.be.a('object');
                body.should.have.property('error').property('status').eq(res.status);
                body.should.have.property('error').property('message');
            }); 
        });
        done();
    });

    it('should validate password', (done) => {
        let users = [
            {"email": "abc@xyz.com", "password": null},
            {"email": "abc@xyz.com", "password": ""},
            {"email": "abc@xyz.com", "password": "a"},
            {"email": "abc@xyz.com", "password": "ab"},
            {"email": "abc@xyz.com", "password": "abc"},
            {"email": "abc@xyz.com", "password": "abcd"},
            {"email": "abc@xyz.com", "password": "abcde"}            
        ];
        users.forEach(user => {
            chai.request(app)
            .post('/auth/register')
            .send(user)
            .end((err, res) => {
                const body = res.body;                
                res.should.have.status(422);
                body.should.be.a('object');
                body.should.have.property('error').property('status').eq(res.status);
                body.should.have.property('error').property('message');
            }); 
        });
        done();
    });
    //it('should check if password and confirm password matches');
    it('should fail when username already exists', (done) => {
        let user = {
            "email": "abc@xyz.com",
            "password": "abcdef"
        };        
            chai.request(app)
            .post('/auth/register')
            .send(user)
            .end((err, res) => {
                const body = res.body;                
                res.should.have.status(422);
                body.should.be.a('object');
                body.should.have.property('error').property('status').eq(res.status);
                body.should.have.property('error').property('message');
            });        
        done();       
    });
    it('should use bcryptjs to store password');
    it('should register new user');
});