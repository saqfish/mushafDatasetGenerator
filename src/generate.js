const { parse } = require("./parse");
const { generateFileNames, readRaw, write } = require("./file");

const run = async () => {
  const path = process.argv[2];
  const filenames = generateFileNames(path);
  const raw = await readRaw(filenames);
  const filters = require(`../${path}/filter`);
  const sectionData = require(`../${path}/sections`);
  const { chapters, sections, verses } = parse(raw, filters, sectionData);

  write(`out/${path}/raw.json`, raw.flat());
  write(`out/${path}/verses.json`, verses);
  write(`out/${path}/chapters.json`, chapters);
  write(`out/${path}/sections.json`, sections);
};

run();
