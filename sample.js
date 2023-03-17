import crypto from "crypto";

const string = "123";

const hash = crypto.createHash('md5').update(string).digest('hex');

console.log("hasil: ", hash)