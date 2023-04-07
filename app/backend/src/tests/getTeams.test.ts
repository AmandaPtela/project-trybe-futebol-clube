import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import teamsMock from './mocks/teamsMock';
import Teams from '../database/models/teamsModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
  beforeEach(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(teamsMock as Teams[]);
    sinon
      .stub(Teams, "findOne")
      .resolves(teamsMock[0] as Teams);
  });

  afterEach(() => {
    (Teams.findAll as sinon.SinonStub).restore();
    (Teams.findOne as sinon.SinonStub).restore();
  })

  it('GetAll deve retornar todos os times', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

    expect(chaiHttpResponse.body).to.be.deep.eq(teamsMock);
  });

  it('GetById deve retornar o time solicitado', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');

    expect(chaiHttpResponse.body).to.be.deep.eq(teamsMock[0]);
  });
});
