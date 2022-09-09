import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Login from '../interface/loginInterface';
import Users from '../database/models/users';

chai.use(chaiHttp);

const { expect } = chai;

const userData = {
  id:1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
}

const userLogin = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const noEmail = {
  email: '',
  password: 'secret_admin',
}

const noPassword = {
  email: 'admin@admin.com',
  password: '',
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjYyNjg5NzU2fQ.qgnwjYUw2f-i8Dxx0rVMpRRkUTnog6rXN3-x68aM_wo'


describe('Login', () => {
  describe('/login', () => {

    beforeEach(() => {
      sinon.stub(Users, "findOne").resolves(userData as Users);
    })

    afterEach(() => {
      sinon.restore();
    })

    it('return status 200', async () => {
      const response = await chai.request(app)
      .post('/login').send(userLogin);
      

      expect(response.status).to.be.equal(200);
    })

    it('token existe', async () => {
      const response = await chai.request(app)
      .post('/login').send(userLogin)

      expect(response.body.token).to.be.string;
    })

    it('requisicao feita sem email', async () => {
      const response = await chai.request(app)
      .post('/login').send(noEmail)
      
      expect(response.body.message).to.be.equal('All fields must be filled');
    })

    it('requisicao feita sem password', async () => {
      const response = await chai.request(app)
      .post('/login').send(noPassword)

      expect(response.body.message).to.be.equal('All fields must be filled');
    })

  

  })
  describe('/login/validate', () => {
    
  }) 
});