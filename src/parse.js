const { cleanArray } = require("./util");
const sections = require("./sections");

const newChapter = () => {
  return { title: "", numChapter: 0, numVerses: 0, verses: [] };
};

const parseVerses = (text, filters) => {
  const {
    tawbahFilter,
    bismillahFilter,
    chapterFilter,
    fatihaBismillahSkip,
  } = filters;
  const joined = text.join(" ");
  const split = joined.match(/[^\u0660-\u0669]+/g);
  const chapters = [];
  const verses = [];
  let chapter = newChapter();
  let order = 0;
  split.forEach((s, i) => {
    s = s.replace(/,/g, "").trim();
    const match = s.match(chapterFilter);
    if (match && i) {
      if (chapter.verses.length) {
        order++;
        chapter.numChapter = order;
        chapters.push(chapter);
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
        if (!fatihaBismillahSkip && !order) verses.push(b[1]);
      }
      chapter.title = b[0];
      if (verse) {
        chapter.verses.push(verse.trim());
        verses.push(verse.trim());
      }
    } else {
      chapter.verses.push(s);
      verses.push(s);
    }
    chapter.numVerses++;
  });
  return { chapters, verses };
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
        verse: { text: verses[s.start], number: s.start + 1 },
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
  const { chapters, verses } = parseVerses(raw, filters);
  const sections = parseSections(chapters, filters);
  let count = 0;
  raw.forEach((page, p) => {
    page.forEach((line, l) => {
      const check = line.match(/[\u0660-\u0669]+/g);
      if (check) {
        check.forEach((c) => {
          verses[count] = {
            text: verses[count],
            number: count + 1,
            page: p + 1,
            line: l,
          };
          count++;
        });
        l++;
      }
    });
  });
  return { chapters, sections, verses };
};

module.exports = { parse };
