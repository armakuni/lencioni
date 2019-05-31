describe("Survey", function() {
  var Survey = require("../../src/survey/survey");

  var survey;
  var groups;

  describe("toSurveyJsElements", function() {
    it("should be able to give me an empty array when no data", function() {
      survey = new Survey([]);
      expect(survey.toSurveyJsElements()).toEqual([]);
    });

    it("should give me the 3 question elements for three questions", function() {
      groups = mockGroups({
        myamazinggroup: 2,
        anotheramazinggroup: 1
      });
      survey = new Survey(groups);

      expect(survey.toSurveyJsElements().length).toEqual(3);
    });

    it("should give me the question elements with unique names", function() {
      groups = mockGroups({
        myamazinggroup: 2,
        anotheramazinggroup: 1
      });
      survey = new Survey(groups);

      expect(survey.toSurveyJsElements()[0].name).toEqual("myamazinggroup_0");
      expect(survey.toSurveyJsElements()[1].name).toEqual("myamazinggroup_1");
      expect(survey.toSurveyJsElements()[2].name).toEqual(
        "anotheramazinggroup_0"
      );
    });

    it("should give me question elements with valid serverjs data object", function() {
      groups = mockGroups({
        myamazinggroup: 2,
        anotheramazinggroup: 1
      });
      survey = new Survey(groups);

      expect(survey.toSurveyJsElements()).toContain(
        jasmine.objectContaining({
          type: "rating",
          isRequired: true,
          rateMin: 1,
          rateMax: 5,
          minRateDescription: "(Never)",
          maxRateDescription: "(Always)"
        })
      );
    });

    it("should give me question elements with a name", function() {
      groups = mockGroups({
        myamazinggroup: 2,
        anotheramazinggroup: 1
      });
      survey = new Survey(groups);

      expect(survey.toSurveyJsElements()[0].name).toEqual("myamazinggroup_0");
    });

    it("should give me question elements with a title", function() {
      groups = mockGroups({
        myamazinggroup: 2,
        anotheramazinggroup: 1
      });
      survey = new Survey(groups);

      expect(survey.toSurveyJsElements()[0].title).toEqual("question 1");
      expect(survey.toSurveyJsElements()[1].title).toEqual("question 2");
    });
  });

  describe("toSurveyJsJSON", function() {
    it("should be able to give me an skeleton json when no data", function() {
      survey = new Survey([]);
      expect(survey.toSurveyJsJSON()).toEqual(
        '{"completedHTML":"<h3>Thank you for your feedback.</h3> <h5>Your thoughts and ideas will help us to create a great product!</h5>","pages":[{"name":"page1","elements":[]}]}'
      );
    });

    it("should have a configurable HTML property", function() {
      survey = new Survey([]);
      survey.props.completedHTML = "<test>";
      expect(survey.toSurveyJsJSON()).toEqual(
        '{"completedHTML":"<test>","pages":[{"name":"page1","elements":[]}]}'
      );
    });
  });

  describe("Shuffle Questions", function() {
    var questions;
    var survey;
    beforeEach(function() {
      questions = [
        "Are you happy with the team you're in?",
        "Are you really happy?",
        "Are you sure?",
        "Is that definitely true?"
      ];
      survey = new Survey([]);
    });

    it("should contain the same number of questions", function() {
      expect(survey.shuffleQuestions(questions).length).toEqual(4);
    });

    it("should return a list of shuffled questions", function() {
      expect(survey.shuffleQuestions(questions)).not.toEqual([
        "Are you happy with the team you're in?",
        "Are you really happy?",
        "Are you sure?",
        "Is that definitely true?"
      ]);
    });

    it("should return the same questions again not in the same order", function() {
      expect(survey.shuffleQuestions(questions)).not.toEqual(
        survey.shuffleQuestions(questions)
      );
    });
  });
  describe("Calculate results", function() {
    var results;
    var survey;
    beforeEach(function() {
      groups = mockGroups({
        myamazinggroup: 2,
        anotheramazinggroup: 1
      });
      survey = new Survey(groups);
    });

    it("should return an an empty array if no results are provided", function() {
      expect(survey.calculateResults()).toEqual([]);
    });

    it("should return an array of results", function() {
      var expectedResult = [];
      expectedResult["accountability"] = 2;
      expectedResult["commitment"] = 2;
      expectedResult["results"] = 3;

      expect(survey.calculateResults(mockResults())).toEqual(expectedResult);
    });
  });
});

function mockGroups(questionGroupSpec) {
  questionGroups = [];

  for (key in questionGroupSpec) {
    questionGroups.push({
      name: key,
      questions: mockQuestions(questionGroupSpec[key])
    });
  }

  return questionGroups;
}

function mockQuestions(count) {
  var questions = [];

  for (var index = 1; index <= count; index++) {
    questions.push("question " + index);
  }
  return questions;
}

function mockResults() {
  var data = [];
  data["accountability_0"] = 3;
  data["accountability_1"] = 1;
  data["accountability_2"] = 2;
  data["commitment_0"] = 2;
  data["commitment_1"] = 1;
  data["commitment_2"] = 3;
  data["results_0"] = 5;
  data["results_1"] = 1;
  data["results_2"] = 3;

  var result = {
    data: data
  };

  return result;
}
