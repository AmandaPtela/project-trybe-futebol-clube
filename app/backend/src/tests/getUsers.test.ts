import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Users from '../database/models/usersModel';
import userMock from './mocks/usersMock';
import usersService from '../services/userService';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  beforeEach(async () => {
    sinon
      .stub(Users, "findAll")
      .resolves(userMock as Users[]);
  });

  afterEach(() => {
    (Users.findAll as sinon.SinonStub).restore();
    sinon.restore;
  })

  it(' GET /users -> GetAll deve retornar todos os usuários', async () => {
    const chaiHttpResponse = await chai
      .request(app).get('/users');

    expect(chaiHttpResponse.body).to.be.deep.eq(userMock);
  });

  it(`POST /login deve retornar um status 400 e mensagem 
   "All fields must be filled" caso o campo "email" esteja vazio`, async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send({ 'email': '', 'password': '123456' });

    expect(chaiHttpResponse.body).to.be.deep.eq({ 'message': 'All fields must be filled' });
    expect(chaiHttpResponse.status).to.be.deep.eq(400);
  });

  it(`POST /login deve retornar um status 400 e mensagem "All fields must be filled" 
  caso o campo "password" esteja vazio`, async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send({ 'email': '', 'password': '123456' });

    expect(chaiHttpResponse.body).to.be.deep.eq({ 'message': 'All fields must be filled' });
    expect(chaiHttpResponse.status).to.be.deep.eq(400);
  });

  /* // para aqui

  it('POST /login deve retornar um status 401 e mensagem "Invalid email or password"', async () => {
    const chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({ email: 'user@admin.com', password: 'secret_admin' });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "Incorrect email or password" });
  });

  it(`POST /login deve retornar um status 401 e mensagem "Invalid email or password" 
  caso o campo "email" seja inválido`, async () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let email = true;

    const chaiHttpResponse = await chai.request(app).post('/login')
      .send({ 'email': 'email@errado.com', 'password': 'secret_admin' });

    if (!emailRegex.test(chaiHttpResponse.body.email)) return email = false;

    expect(email).to.be.deep.eq(false);
    expect(chaiHttpResponse.body).to.be.deep.eq({ 'message': 'Invalid email or password' });
    expect(chaiHttpResponse.status).to.be.deep.eq(401);
  }); */

  it(`POST /login deve retornar um status 200 e um token caso os campos estejam válidos`, async () => {
    const chaiHttpResponse = await chai.request(app).post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    const role = chaiHttpResponse.body.token;

    const users = Users.findOne({ where: chaiHttpResponse.body.email });

    console.log(chaiHttpResponse.status)
    console.log(users)
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(role);
  });

});
