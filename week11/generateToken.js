const jwt = require("jsonwebtoken");

const token = jwt.sign({ id: 1, name: "Pratiksha" }, "secretkey");
console.log(token);