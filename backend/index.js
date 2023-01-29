const express = require("express");
const { faker } = require("@faker-js/faker");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ type: "application/*+json" }));

const MAX_LATENCY = 100;

const users = Array(50)
  .fill(null)
  .map(() => ({
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  }));

const jobs = users
  .map((el) => el.userId)
  .map((userId) => ({
    userId,
    jobId: faker.datatype.uuid(),
    company: faker.company.companyName(),
    balance: faker.finance.amount(),
    jobTitle: faker.name.jobTitle(),
    jobArea: faker.name.jobArea(),
    jobType: faker.name.jobType(),
  }));

const personalDetails = users
  .map((el) => el.userId)
  .map((userId) => ({
    userId,
    personalDetailsId: faker.datatype.uuid(),
    animal: faker.animal.cat(),
    vehicle: faker.vehicle.vehicle(),
    color: faker.commerce.color(),
    department: faker.commerce.department(),
    music: faker.music.genre(),
  }));

const respondWithLatency = (res, data) => {
  setTimeout(() => {
    res.send(data);
  }, MAX_LATENCY * Math.random()); // random between 0 and 200ms
};

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.userId === id);
  respondWithLatency(res, job);
});

app.post("/jobs/batched", (req, res) => {
  const { userIds } = req.body;
  const filteredJobs = userIds.map((id) =>
    jobs.find((job) => job.userId === id)
  );
  respondWithLatency(res, filteredJobs);
});

app.get("/personal-details/:id", (req, res) => {
  const { id } = req.params;
  const personalDetail = personalDetails.find(
    (personalDetail) => personalDetail.userId === id
  );
  respondWithLatency(res, personalDetail);
});

app.post("/personal-details/batched", (req, res) => {
  const { userIds } = req.body;
  const filteredPersonalDetails = userIds.map((id) =>
    personalDetails.find((personalDetail) => personalDetail.userId === id)
  );
  respondWithLatency(res, filteredPersonalDetails);
});

app.get("/combined", (req, res) => {
  const combinedData = users.map((user) => {
    const job = jobs.find((job) => job.userId === user.userId);
    const personalDetail = personalDetails.find(
      (personalDetail) => personalDetail.userId === user.userId
    );
    return { ...user, ...job, ...personalDetail };
  });
  respondWithLatency(res, combinedData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
