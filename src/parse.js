const { cleanArray } = require("./util");
const sections = require("./sections");

const newChapter = () => {
  return { title: "", numChapter: 0, numVerses: 0, verses: [] };
};

const parseVerses = (text, filters) => {
  const { tawbahFilter, bismillahFilter, chapterFilter } = filters;
  const joined = text.join(" ");
  const split = joined.match(/[^\u0660-\u0669]+/g);
  const seperated = [];
  let chapter = newChapter();
  let order = 0;
  split.forEach((s, i) => {
    s = s.replace(/,/g, "").trim();
    const match = s.match(chapterFilter);
    if ((match && i) || i === split.length - 1) {
      if (chapter.verses.length) {
        order++;
        chapter.numChapter = order;
        seperated.push(chapter);
        chapter = newChapter();
      }
    }
    if (chapter.numVerses === 0) {
      let b;
      let verse;
      if (order === 8) {
        b = cleanArray(s.split(tawbahFilter));
        verse = b[1] + b[2];
      } else {
        b = cleanArray(s.split(bismillahFilter));
        verse = b[2];
      }
      chapter.title = b[0];
      if (verse) chapter.verses.push(verse.trim());
    } else chapter.verses.push(s);
    chapter.numVerses++;
  });
  return seperated;
};

const parseSections = (text) => {
  let verses = [];
  let compiled = [];
  let juz = [];
  text.forEach((chapter) => {
    verses.push(chapter.verses);
  });
  verses = verses.flat();
  sections.forEach((section) => {
    section.forEach((s) => {
      const ns = {
        verse: { text: verses[s.start], number: s.start },
        page: { ...s.page },
      };
      juz.push(ns);
    });
    compiled.push(juz);
    juz = [];
  });
  return compiled;
};

const parse = (raw, filters) => {
  const pages = [];
  const chapters = parseVerses(raw, filters);
  const sections = parseSections(chapters, filters);
  let count = 0;
  const verses = [];
  raw.forEach((page, p) => {
    page.forEach((line, l) => {
      const check = line.match(/[\u0660-\u0669]+/g);
      if (check) {
        check.forEach(() => {
          verses.push({ verse: { text: verse, count }, page: p, line: l });
          count++;
        });
        l++;
      }
    });
    pages.push(page);
  });
  return { pages, chapters, sections, verses };
};

module.exports = { parse };
