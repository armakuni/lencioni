var questionGroups;

function Survey(groups) {
    questionGroups = groups;

    this.toSurveyJsElements = toSurveyJsElements;
    this.toSurveyJsJSON = toSurveyJsJSON;
    this.shuffleQuestions = shuffleQuestions;
    this.calculateResults = calculateResults;
    this.resultToRating = resultToRating;

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

function calculateResults(results) {
    if (results == undefined || results.length == 0) {
        return [];
    }

    var resultCount = [];

    Object.entries(results.data).forEach(result => {
        let key = result[0].replace(/_[0-9]/g, "");
        let value = result[1];

        if (resultCount[key] == undefined) {
          resultCount[key] = 0;
        }
        resultCount[key] = resultCount[key] + value;
      });

      var averageCount = [];

      for (var key in resultCount) {
        averageCount[key] = resultCount[key] / 3;
      }

    return averageCount;
}

function resultToRating(result) {
    if (result >= 3.75) {
        return "green";
    }
    else if (result >= 3.25) {
        return "amber";
    }
    return "red";
}

var shuffleArray = function(original) {
    var copy = Array.from(original);

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};