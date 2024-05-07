import { use, expect } from 'chai';
import chaiHttp from "chai-http";
import request from "request";

const chai = use(chaiHttp);

describe("Get All Cards", function () {
    var url = "http://localhost:3000/api/cards";

    it("returns status 200 to check if api works", function (done) {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
        });
    });
})

describe("Delete Cards", function () {
    var url = "http://localhost:3000";
    var path = "/api/deletecats";

    it('should delete a cat via POST', function(done) {
        this.timeout(5000);
        chai
            .request(url)
            .post(path)
            .set('content-type', 'application/json')
            .send({title: 'aaaa'})
            .end(function(error, response, body) {
                if (error) {
                    done(error)
                } else {
                    done();
                }
            }
        )
    })
})

describe("Add Cards", function () {
    var url = "http://localhost:3000";
    var path = "/api/postcards";

    it('should add a cat via POST', function(done) {
        this.timeout(5000);
        chai
            .request(url)
            .post(path)
            .set('content-type', 'application/json')
            .send({title: 'aaaa', colour: "aaaa", link: "aaaa", description: "aaaa"})
            .end(function(error, response, body) {
                if (error) {
                    done(error)
                } else {
                    done();
                }
            }
        )
    })
})