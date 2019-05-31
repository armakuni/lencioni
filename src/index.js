var Survey = require("../assets/external/surveyjs/1.0.85/survey.jquery");
var QuestionGroup = require("./survey/QuestionGroup");
var LencioniSurvey = require("./survey/Survey");
var GenerateSeed = require("./GenerateSeed");
import "../assets/external/surveyjs/1.0.85/survey.css";

const QUESTIONS_PER_GROUP = 3;

var data = {
  trust: {
    questions: [
      "Team members admit their mistakes.",
      "Team members acknowledge their weaknesses to one another.",
      "Team members ask for help without hesitation.",
      "Team members ask one another for input regarding their areas of responsibility.",
      "Team members acknowledge and tap into one another's skills and expertise.",
      "Team members willingly apologize to one another.",
      "Team members are unguarded and genuine with one another.",
      "Team members can comfortably discuss their personal lives with one another."
    ]
  },
  conflict: {
    questions: [
      "Team members are passionate and unguarded in their discussion of issues.",
      "Team meetings are interesting and compelling (not boring).",
      "During team meetings, the most important-and difficult-issues are discussed.",
      "Team members voice their opinions even at the risk of causing disagreement.",
      "During discussions, team members challenge one another about how they arrived at their conclusions and opinions.",
      "Team members solicit one another's opinions during meetings.",
      "Team members communicate unpopular opinions to the group.",
      "When conflict occurs, the team confronts and deals with the issue before moving to another subject."
    ]
  },
  commitment: {
    questions: [
      "Team members leave meetings confident that everyone is committed to the decisions that were agreed upon.",
      "Team members end discussions with clear and specific resolutions and calls to action.",
      "The team is clear about its direction and priorities.",
      "The team is aligned around common objectives.",
      "The team is decisive, even when perfect information is not available.",
      "The team sticks to decisions.",
      "Team members support group decisions even if they initially disagreed."
    ]
  },
  accountability: {
    questions: [
      "Team members point out one another's unproductive behaviors.",
      "Team members are quick to confront peers about problems in their respective areas of responsibility.",
      "Team members question one another about their current approaches and methods.",
      "The team ensures that poor performers feel pressure and the expectation to improve.",
      "All members of the team are held to the same high standards.",
      "Team members consistently follow through on promises and commitments.",
      "Team members offer unprovoked, constructive feedback to one another."
    ]
  },
  results: {
    questions: [
      "Team members are quick to point out the contributions and achievements of others.",
      "The team has a reputation for high performance.",
      "When the team fails to achieve collective goals, each member takes personal responsibility to improve the team's performance.",
      "Team members willingly make sacrifices in their areas for the good of the team.",
      "Team members are slow to seek credit for their own contributions.",
      "The team consistently achieves its objectives.",
      "Team members value collective success more than individual achievement.",
      "Team members place little importance on titles and status. (A high score on this statement indicates that titles and status are NOT important to team members.)Ÿ"
    ]
  }
};

var questionGroups = [];
jQuery.each(data, function(groupName, groupObject) {
  var group = new QuestionGroup(
    groupName,
    QuestionGroup.arrayFromObject(groupObject)
  )
    .shuffleQuestions(GenerateSeed())
    .limit(QUESTIONS_PER_GROUP);

  questionGroups.push(group);
});

var lencioniSurvey = new LencioniSurvey(questionGroups);
window.survey = new Survey.Model(lencioniSurvey.toSurveyJsJSON());

survey.onComplete.add(function(results) {
  var results = lencioniSurvey.calculateResults(results);

  console.log(results);

  document.querySelector("#surveyResult").innerHTML = "results in console";
});

$("#surveyElement").Survey({ model: survey });
