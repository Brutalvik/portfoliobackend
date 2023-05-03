const client = require("./config");

const users = async () => {
  await client.connect();
  console.log("Accessed User Cluster!");
  const usersCollection = client.db("portfolio").collection("users");
  return usersCollection;
};

module.exports = users;
