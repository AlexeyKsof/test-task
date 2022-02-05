const parseWords = (parses = []) => {
  let words = parses.filter((p) => p.score.toFixed(2) > 0.4);
  if (words.length === 0) return { value: "", gender: "", error: true };

  words = parses.filter((p) => p.tag.POS === "NOUN");
  if (words.length === 0) return { value: "", gender: "", error: true };

  words = words.filter((p) => {
      console.log(p);
      return p.tag.NMbr === "sing" || (p.tag.NMbr === "plur" && p.tag.Pltm === true)
  });
  if (words.length === 0) return { value: "", gender: "", error: true };

  words = words.filter((p) => p.tag.CAse === "nomn");
  if (words.length === 0) return { value: "", gender: "", error: true };

  let word = {};
  if (words.length > 1) {
    let maxScore = 0,
      i = words.length;
    while (i--) {
      if (words[i].score.toFixed(2) > maxScore) {
        maxScore = words[i].score.toFixed(2);
        word = words[i];
      }
    }
  } else {
    word = words[0];
  }

  if(word.tag === undefined) return { value: "", gender: "", error: true };

  return { 
      value: word.word, 
      gender: parseGender(word.tag.GNdr), 
      pluraleTantum: word.tag.Pltm === undefined ? false : word.tag.Pltm,
      error: false 
    };
};

const parseGender = (gender) => {
  switch (gender) {
    case "masc":
      return "мужской";
      break;
    case "femn":
      return "женский";
      break;
    case "neut":
      return "средний";
      break;
    default:
        return "общий";
  }
};

exports.parseWords = parseWords;
