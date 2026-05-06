const crypto = require('crypto');

// CHANGE THIS TO THE PASSWORD YOU WANT TO GIVE THE NEW MEMBER
const password = "TESTPASSWORD"; 

const hashed = crypto.createHash('sha256').update(password).digest('hex');

console.log("------------------------------------------");
console.log("HASHED KEY TO COPY:");
console.log(hashed);
console.log("------------------------------------------");