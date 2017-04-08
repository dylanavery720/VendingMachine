process.env.NODE_ENV = 'test';

const chai = require('chai');

const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../server.js');


chai.use(chaiHttp);

describe('Server', () => {
 //  beforeEach((done) => {
 //    database.migrate.rollback()
 //  .then(() => {
 //    database.migrate.latest()
 //    .then(() => {
 //      return database.seed.run()
 //      .then(() => {
 //        done();
 //      });
 //    });
 //  });
 //  });
 //
 //  afterEach(function(done) {
 //   database.migrate.rollback()
 //   .then(function() {
 //     done();
 //   });
 // });

  it('should exist', () => {
    expect(app).to.exist;
  });

})

  describe('POST /credits', () => {


    it('should add a new artist', (done) => {
      chai.request(app)
        .post('/credits')
        .send({
          credits: 100,
          selection: 'a1'
        })
        .end((err, res) => {
          if (err) { done(err); }
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          // expect(res.body).to.be.a('array');
          // expect(res.body.length).to.equal(31);
          // expect(res.body[30].name).to.equal('Muddy Waters');
          // expect(res.body[30].id).to.equal(31);
          done();
        });
      })

    it('should return a 200 and html', (done) => {
      chai.request(app)
      .post('/credits')
      .end((err, res) => {
        if (err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
    });
  });
