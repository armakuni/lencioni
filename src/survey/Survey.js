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

    return [{
        type: 'rating',
        isRequired: true,
        rateMin: 1,
        rateMax: 5,
        minRateDescription: '(Never)',
        maxRateDescription: '(Always)'
    }]
};