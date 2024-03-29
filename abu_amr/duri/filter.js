const chapterFilter = /\u0633\u064F\u0648\u0631\u064E\u0629\u064F/g;
const bismillahFilter = /(\u0628(\u0650?)(\u0651?)(\u0650?)\u0633\u06E1\u0645\u0650 \u0627\u0650\u06EC\u0644\u0644\u0651\u064E\u0647\u0650 \u0627\u0650\u06EC\u0644\u0631\u0651\u064E\u062D\u06E1\u0645\u064E\u0670\u0646\u0650 \u0627\u0650\u06EC\u0644\u0631\u0651\u064E\u062D\u0650\u064A\u0645\u0650)/g;
const tawbahFilter = /(\u0628\u064E\u0631\u064E\u0627\u0653\u0621\u064E\u0629\u065E \u0645\u0651\u0650\u0646\u064E)/g;
const fatihaBismillahSkip = true;

module.exports = { chapterFilter, bismillahFilter, tawbahFilter, fatihaBismillahSkip };
