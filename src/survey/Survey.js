var questionGroups;

function Survey(groups) {
    questionGroups = groups;

    this.toSurveyJsElements = toSurveyJsElements
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