var questions = $(["Team members admit their mistakes.",
"Team members are passionate and unguarded in their discussion of issues.",
"Team members are quick to point out the contributions and achievements of others.",
"Team meetings are interesting and compelling (not boring).",
"During team meetings, the most important—and difficult—issues are discussed.",
"Team members acknowledge their weaknesses to one another.",
"Team members voice their opinions even at the risk of causing disagreement.",
"Team members point out one another’s unproductive behaviors.",
"The team has a reputation for high performance.",
"Team members ask for help without hesitation.",
"Team members leave meetings confident that everyone is committed to the decisions that were agreed upon.",
"During discussions, team members challenge one another about how they arrived at their conclusions and opinions.",
"Team members ask one another for input regarding their areas of responsibility.",
"When the team fails to achieve collective goals, each member takes personal responsibility to improve the team’s performance.",
"Team members willingly make sacrifices in their areas for the good of the team.",
"Team members are quick to confront peers about problems in their respective areas ofresponsibility.",
"Team members acknowledge and tap into one another’s skills and expertise.",
"Team members solicit one another’s opinions during meetings.",
"Team members end discussions with clear and specific resolutions and calls to action.",
"Team members question one another about their current approaches and methods.",
"The team ensures that poor performers feel pressure and the expectation to improve.",
"Team members willingly apologize to one another.",
"Team members communicate unpopular opinions to the group.",
"The team is clear about its direction and priorities.",
"Team members are slow to seek credit for their own contributions.",
"All members of the team are held to the same high standards.",
"When conflict occurs, the team confronts and deals with the issue before moving to another subject.",
"The team is aligned around common objectives.",
"The team consistently achieves its objectives.",
"The team is decisive, even when perfect information is not available.",
"Team members value collective success more than individual achievement.",
"Team members are unguarded and genuine with one another.",
"Team members can comfortably discuss their personal lives with one another.",
"The team sticks to decisions.",
"Team members consistently follow through on promises and commitments.",
"Team members offer unprovoked, constructive feedback to one another.",
"Team members place little importance on titles and status. (A high score on this statement indicates that titles and status are NOT important to team members.)",
"Team members support group decisions even if they initially disagreed."]);

var data = {
  trust : {
    questions: ["Team members admit their mistakes.","Team members acknowledge their weaknesses to one another."]
  },
  conflict : {
    questions: ["Team members are passionate and unguarded in their discussion of issues.",
    "Team meetings are interesting and compelling (not boring)."
  ]
  },
  commitment : {
    questions: ["Team members leave meetings confident that everyone is committed to the decisions that were agreed upon.","Team members leave meetings confident that everyone is committed to the decisions that were agreed upon.","Team members end discussions with clear and specific resolutions and calls to action."]
  },
  accountability : {
    questions: ["Team members point out one another’s unproductive behaviors.","Team members are quick to confront peers about problems in their respective areas ofresponsibility."]
  },
  results : {
    questions: ["Team members are quick to point out the contributions and achievements of others.","The team has a reputation for high performance."]
  }
}

var elements = [];
jQuery.each(data, function(index, group) {
  elements = jQuery.merge(elements, buildQuestions(group, index))
})

console.log(elements)

function buildQuestions(group, groupName) {
    var elements = []
    jQuery.each(group.questions, function(index, element) {
      elements.push({
        "type": "rating",
        "name": groupName+"_"+index,
        "title": element,
        "isRequired": true,
        "rateMin": 1,
        "rateMax": 5,
        "minRateDescription": "(Never)",
        "maxRateDescription": "(Always)"
    })
  })

  return elements;
}

var json = {
  "completedHtml": "<h3>Thank you for your feedback.</h3> <h5>Your thoughts and ideas will help us to create a great product!</h5>",
  "completedHtmlOnCondition": [
      {
          "expression": "{nps_score} > 8",
          "html": "<h3>Thank you for your feedback.</h3> <h5>We glad that you love our product. Your ideas and suggestions will help us to make our product even better!</h5>"
      }, {
          "expression": "{nps_score} < 7",
          "html": "<h3>Thank you for your feedback.</h3> <h5> We are glad that you share with us your ideas.We highly value all suggestions from our customers. We do our best to improve the product and reach your expectation.</h5>\n"
      }
  ],
  "pages": [
      {
          "name": "page1",
          "elements": elements
      }
  ],
  "showQuestionNumbers": "off"
};

window.survey = new Survey.Model(json);

survey
  .onComplete
  .add(function (result) {
      document
          .querySelector('#surveyResult')
          .innerHTML = "result: " + JSON.stringify(result.data);
  });

$("#surveyElement").Survey({model: survey});
