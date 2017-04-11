process.env.NODE_ENV = 'test';

const chai = require('chai');

const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../server.js');


chai.use(chaiHttp);

describe('Server', () => {
  it('should exist', () => {
    expect(app).to.exist;
  });
})

describe('GET /treats', () => {
  it('should retrieve all treats and stock our vending machine', (done) => {
    chai.request(app)
    .get('/treats')
    .end(function(err, res) {
        if (err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body.treats.a1.length).to.equal(4);
        expect(res.body.treats.a1[0].name).to.equal('twix');
        done();
      });
  })
})


  describe('POST /credits', () => {
    it('should return change when a person inserts more than enough credits', (done) => {
      chai.request(app)
        .post('/credits')
        .send({
          credits: 100,
          selection: 'b1'
        })
        .end((err, res) => {
          if (err) { done(err); }
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.treat).to.be.a('string');
          expect(res.body.treat).to.equal('kitkat.png');
          expect(res.body.change).to.equal(25);
          done();
        });
      })

      it('should throw an error when person has not enough credits', (done) => {
        chai.request(app)
          .post('/credits')
          .send({
            credits: 50,
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

    it('should return a 500 if candy doesnt exist', (done) => {
      chai.request(app)
      .post('/credits')
      .send({
        credits: 200,
        selection: 'e3'
      })
      .end((err, res) => {
        if (err) { done(err); }
        expect(res).to.have.status(500);
        done();
      });
    });

    describe('Vending Machine', () => {
      it('should return change when a person inserts more than enough credits', (done) => {
        chai.request(app)
          .post('/credits')
          .send({
            credits: 100,
            selection: 'b1'
          })
          .end((err, res) => {
            if (err) { done(err); }
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body.treat).to.be.a('number');
            expect(res.body.change).to.equal(25);
            done();
          });
        })

        it('should return a treat to the person', (done) => {
          chai.request(app)
            .post('/credits')
            .send({
              credits: 100,
              selection: 'b1'
            })
            .end((err, res) => {
              if (err) { done(err); }
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(res.body.treat).to.be.a('string');
              expect(res.body.treat).to.equal('kitkat.png');
              done();
            });
          })
  });
});
