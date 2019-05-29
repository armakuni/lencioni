var questionGroups;

function Survey(groups) {
    questionGroups = groups;

    this.toSurveyJsElements = toSurveyJsElements;
    this.toSurveyJsJSON = toSurveyJsJSON;
    this.shuffleQuestions = shuffleQuestions;

    this.props = {
        completedHTML : "<h3>Thank you for your feedback.</h3> <h5>Your thoughts and ideas will help us to create a great product!</h5>",
        elements: []
    }
}

module.exports = Survey;

toSurveyJsElements = function () {
    if (questionGroups.length <= 0) {
        return [];
    }

    var surveyJsElements = [];

    questionGroups.forEach(function (questionGroup) {
        questionGroup.questions.forEach(function (question, index) {
            surveyJsElements.push({
                name: questionGroup.name + "_" + index,
                type: 'rating',
                title: question,
                isRequired: true,
                rateMin: 1,
                rateMax: 5,
                minRateDescription: '(Never)',
                maxRateDescription: '(Always)'
            });
        });
    })


    return surveyJsElements;
};

function toSurveyJsJSON() {
    var surveyJsObject = {};

    surveyJsObject.completedHTML = this.props.completedHTML;
    surveyJsObject.pages = [
        {
            name: "page1",
            elements: this.shuffleQuestions(this.toSurveyJsElements())
          }
    ]

    return JSON.stringify(surveyJsObject);
}

function shuffleQuestions(questions) {
    return shuffleArray(questions)
}

var shuffleArray = function(original) {
    var copy = Array.from(original);

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };