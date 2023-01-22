const fs = require('fs');
const sessionController = require('../../server/controllers/sessionController');

const testJsonFile = path.resolve(__dirname, '../server/db/markets.test.json');

beforeAll((done) => {
  fs.writeFile(testJsonFile, JSON.stringify([]), () => {
    db.reset();
    done();
  });
});

afterAll((done) => {
  fs.writeFile(testJsonFile, JSON.stringify([]), done);
});
