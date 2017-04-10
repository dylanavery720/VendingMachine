process.env.NODE_ENV = 'test';

const chai = require('chai');

const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../server.js');

// const Person = require('../src/Person');

chai.use(chaiHttp);



xit('should allow multiple purchases if affordable', (done) => {
  chai.request(app)
    .post('/credits')
    .send({
      credits: 200,
      selection: 'b1'
    })
    .end((err, res) => {
      if (err) { done(err); }
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.error).to.be.a('string');
      expect(res.body.error).to.equal('You do not have enough money');
      done();
    });
  })

it('')
