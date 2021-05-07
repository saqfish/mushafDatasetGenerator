var util = require("util");
const log = (output) =>
  console.log(util.inspect(output, { maxArrayLength: null }));

const cleanArray = (arr) => {
  let cleaned = [];
  for (text of arr) {
    const check = text.length > 1;
    if (check) cleaned.push(text);
  }
  return cleaned;
};

module.exports = { log, cleanArray };
