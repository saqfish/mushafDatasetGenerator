const fs = require("fs");
const {log} = require('./util');

const generateFileNames = (path) => {
  const filenames = [];
  for (let i = 1; i < 605; i++) {
    const num = `${i}`.padStart(3, "0");
    filenames.push(`${path}/text/${num}`);
  }
  return filenames;
};

const readRaw = async (filenames) => {
  const raw = [];
  for (const file of filenames) {
    const data = fs.readFileSync(file, "utf8");
    let split = data.split("\n");
    let lastLine = split[split.length - 1];
    if (!lastLine || lastLine.length === 0)
      split = split.slice(0, split.length - 1);
    raw.push(split);
  }
  return raw;
};

const write = (filename, data) => {
  const fData = JSON.stringify(data, null, 2);
  const status = fs.writeFileSync(filename, fData, "utf8");
  log(`${filename} written`);  
};

module.exports = { generateFileNames, readRaw, write };
