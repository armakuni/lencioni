describe("Survey", function () {
    var Survey = require('../../src/survey/survey');

    var survey;
    var groups;

    describe("toSurveyJsElements", function () {
        beforeEach(function () {

            var test = {
                type: "rating",
                name: "element name",
                title: "element title",
                isRequired: true,
                rateMin: 1,
                rateMax: 5,
                minRateDescription: "(Never)",
                maxRateDescription: "(Always)"
            }
            groups = [];
            groups.push({"name": "myamazinggroup", "questions": []});
            survey = new Survey(groups);
        });

        it("should be able to give me an empty array when no data", function () {
            survey = new Survey([]);
            expect(survey.toSurveyJsElements()).toEqual([]);
        });

        it("should give me question elements with a type of rating", function () {
            expect(survey.toSurveyJsElements()).toContain(jasmine.objectContaining({
                type: "rating",
                isRequired: true,
                rateMin: 1,
                rateMax: 5,
                minRateDescription: "(Never)",
                maxRateDescription: "(Always)"
            }));
        })
    })
});
