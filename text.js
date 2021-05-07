const { parse } = require("./parse");
const { generateFileNames, readRaw, write } = require("./file");

const run = async () => {
  const path = process.argv[2];
  const filenames = generateFileNames(path);
  const raw = await readRaw(filenames);
  const { pages, verses } = parse(raw);
  write(`generated/${path}/raw.json`, raw);
  write(`generated/${path}/pages.json`, pages);
  write(`generated/${path}/verses.json`, verses);
};

run();
