var seedrandom = require("seedrandom");

function QuestionGroup(name, questions) {
  this.name = name;
  this.questions = questions;
  this.shuffleQuestions = shuffleQuestions;
  this.limit = limit;
}

QuestionGroup.arrayFromObject = function(data) {
  questions = [];

  data.questions.forEach(function(question) {
    questions.push(question);
  });

  return questions
}

var shuffleQuestions = function(seed) {
  shuffledQuestions = shuffleArray(seed, this.questions);
  return new QuestionGroup(this.name, shuffledQuestions);
};

var shuffleArray = function(seed, original) {
  var copy = Array.from(original);

  var randomGenerator = new seedrandom(seed);
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(randomGenerator() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

var limit = function(count) {
  if (count < 1) {
    return new QuestionGroup(this.name, []);
  }

  return new QuestionGroup(this.name, this.questions.slice(0, count));
};

module.exports = QuestionGroup;
