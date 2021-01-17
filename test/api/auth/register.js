process.env.NODE_ENV = 'test';

require('dotenv').config();

const chai = require('chai');
const chaiHttp = require( 'chai-http');

const { init_mongodb, close, cleanup } = require('../../../helpers/init_mongodb');

const auth = require('../../../controllers/auth');
const User = require('../../../models/user');
const app = require('../../../app');


chai.should();
chai.use(chaiHttp);

describe('auth register', () => {    
    before( async () => {
        await init_mongodb();
    });

    after( async () => {        
        await close();
    });

    afterEach ( async () => {
        await cleanup();        
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
    
    it('should fail when username already exists', (done) => {
        let userData = {
            "email": "abc@xyz.com",
            "password": "abcdef"
        };
        const user = new User(userData);
        user.save()
            .then((req, res) => {
                chai.request(app)
            .post('/auth/register')
            .send(userData)
            .end((err, res) => {
                const body = res.body;
                res.should.have.status(409);
                body.should.be.a('object');
                body.should.have.property('error').property('status').eq(res.status);
                body.should.have.property('error').property('message');
                done();
            });
        });        
    });
    
    it('should register user and return JWT access token', (done) => {
        let user = {
            "email": "abc@xyz.com",
            "password": "abcdef"
        };        
        chai.request(app)
            .post('/auth/register')
            .send(user)
            .end((err, res) => {
                const body = res.body;                
                res.should.have.status(200);
                body.should.be.a('object');
                body.should.have.property('accessToken');
                done();
            });        
    });    
});