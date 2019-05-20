var seedrandom = require("seedrandom");

function QuestionGroup(name, questions) {
  this.name = name;
  this.questions = questions;
  this.shuffle = shuffle;
}

shuffle = function(seed) {
  shuffledQuestions = shuffleArray(seed, this.questions);
  return new QuestionGroup(this.name, shuffledQuestions);
};

shuffleArray = function(seed, original) {
  var copy = Array.from(original);

  var randomGenerator = new seedrandom(seed);
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(randomGenerator() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

module.exports = QuestionGroup;
