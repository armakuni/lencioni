var Survey = require("../assets/external/surveyjs/1.0.85/survey.jquery");
var QuestionGroup = require("./questiongroup");
var GenerateSeed = require("../src/generateseed")
import "../assets/external/surveyjs/1.0.85/survey.css";

const QUESTIONS_PER_GROUP = 2;

var seed = GenerateSeed();

function buildQuestions(group, groupName) {
  var elements = [];
  jQuery.each(group, function(index, element) {
    elements.push({
      type: "rating",
      name: groupName + "_" + index,
      title: element,
      isRequired: true,
      rateMin: 1,
      rateMax: 5,
      minRateDescription: "(Never)",
      maxRateDescription: "(Always)"
    });
  });

  return elements;
}

var data = {
  trust: {
    questions: [
      "Team members admit their mistakes.",
      "Team members acknowledge their weaknesses to one another."
    ]
  },
  conflict: {
    questions: [
      "Team members are passionate and unguarded in their discussion of issues.",
      "Team meetings are interesting and compelling (not boring)."
    ]
  },
  commitment: {
    questions: [
      "Team members leave meetings confident that everyone is committed to the decisions that were agreed upon.",
      "Team members end discussions with clear and specific resolutions and calls to action."
    ]
  },
  accountability: {
    questions: [
      "Team members point out one another’s unproductive behaviors.",
      "Team members are quick to confront peers about problems in their respective areas ofresponsibility."
    ]
  },
  results: {
    questions: [
      "Team members are quick to point out the contributions and achievements of others.",
      "The team has a reputation for high performance."
    ]
  }
};

var elements = [];
jQuery.each(data, function(index, group) {
  var groupQuestions = new QuestionGroup(index, group.questions);
  groupQuestions = groupQuestions.shuffleQuestions(seed).limit(QUESTIONS_PER_GROUP);
  elements = jQuery.merge(elements, buildQuestions(groupQuestions.questions, groupQuestions.name));
});

var shuffledElements = elements;

var json = {
  completedHtml:
    "<h3>Thank you for your feedback.</h3> <h5>Your thoughts and ideas will help us to create a great product!</h5>",
  completedHtmlOnCondition: [
    {
      expression: "{nps_score} > 8",
      html:
        "<h3>Thank you for your feedback.</h3> <h5>We glad that you love our product. Your ideas and suggestions will help us to make our product even better!</h5>"
    },
    {
      expression: "{nps_score} < 7",
      html:
        "<h3>Thank you for your feedback.</h3> <h5> We are glad that you share with us your ideas.We highly value all suggestions from our customers. We do our best to improve the product and reach your expectation.</h5>\n"
    }
  ],
  pages: [
    {
      name: "page1",
      elements: shuffledElements
    }
  ],
  showQuestionNumbers: "off"
};

window.survey = new Survey.Model(json);

survey.onComplete.add(function(result) {
  document.querySelector("#surveyResult").innerHTML =
    "result: " + JSON.stringify(result.data);
});

$("#surveyElement").Survey({ model: survey });
