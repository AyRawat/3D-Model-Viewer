import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import fs from "fs";
import FormData from "form-data";
chai.use(chaiHttp);

//For Getting the recently added Model
describe("GET /api/getModel", () => {
  isTypedArray("Should get the latest Uploaded Model from DB", (done) => {
    chai
      .request(app)
      .get("/api/getModel")
      .set("content-type", "application/json")
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

//For Saving the Model
describe("POST /api/saveModel", () => {
  it("Should save the Model to DB ", (done) => {
    describe("POST /api/saveModel", () => {
      it("Should save the Model to DB", (done) => {
        let data = new FormData();
        data.append("name", "test");
        data.append("mimetype", "model/gltf+json");
        data.append(
          "file",
          fs.createReadStream(
            "/Users/ayushrawat/Documents/Personal_Projects/Demo_3D_project/demo-project/public/desktop_pc/scene.gltf"
          )
        );
        data.append("description", "Testing it for first time");
        chai
          .request(app)
          .post("/api/saveModel")
          .send(domain)
          .set("content-type", "multipart/form-data")
          .end((err, res) => {
            if (err) {
              console.log(err);
            }
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("message");
            done();
          });
      });
    });
  });
});
