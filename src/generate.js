const { parse } = require("./parse");
const { generateFileNames, readRaw, write } = require("./file");

const run = async () => {
  const path = process.argv[2];
  const filenames = generateFileNames(path);
  const raw = await readRaw(filenames);
  const filters = require(`../${path}/filter`);
  const { pages, verses, sections } = parse(raw, filters);
  write(`out/${path}/raw.json`, raw);
  write(`out/${path}/pages.json`, pages);
  write(`out/${path}/verses.json`, verses);
  write(`out/${path}/sections.json`, sections);
};

run();
