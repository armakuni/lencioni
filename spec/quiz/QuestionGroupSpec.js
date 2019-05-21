describe("Question Group", function() {
  var QuestionGroup = require('../../src/questiongroup');

  var group;


  it("should be able to give me its name", function() {
    group = new QuestionGroup("my amazing group",[]);

    expect(group.name).toEqual("my amazing group");
  });


  it("should be able to give me its questions", function() {
    group = new QuestionGroup("my amazing group",["What is the time"]);

    expect(group.questions).toEqual(["What is the time"]);
  });

  describe("Shuffle", function() {
    var shuffledGroup
    beforeEach(function() {
      group = new QuestionGroup("my amazing group",["What is the time", "What is for dinner", "Where is my car"]);
      shuffledGroup = group.shuffle("myrandomseed");
    });

    it("should be able to give me a shuffled set of questions", function() {
      expect(shuffledGroup).toEqual(jasmine.any(QuestionGroup));
    });

    it("should contain the same number of questions", function() {
      expect(shuffledGroup.questions.length).toEqual(group.questions.length);
    });

    it("should return the same group name", function() {
      expect(shuffledGroup.name).toEqual(group.name);
    });

    it("should return a different question order", function() {
      expect(shuffledGroup.questions).not.toEqual(group.questions);
    });
  })

  describe("Limit", function() {
    var limitedGroup
    beforeEach(function() {
      group = new QuestionGroup("my amazing group",["What is the time", "What is for dinner", "Where is my car"]);
      limitedGroup = group.limit(1);
    });

    it("should be able to give me a limited set of questions", function() {
      expect(limitedGroup).toEqual(jasmine.any(QuestionGroup));
    });

    it("should return the correct number of questions", function() {
      expect(limitedGroup.questions.length).toEqual(1);
    });

    it("should return a group with the same name", function() {
      expect(limitedGroup.name).toEqual("my amazing group");
    });

    it("should limit starting at 0, ending at the number given", function() {
      expect(limitedGroup.questions).toEqual(["What is the time"]);
    });

    it("should return a zero questions when the count is less than 1", function() {
      var negativeLimitedGroup = group.limit(-1);
      expect(negativeLimitedGroup.questions.length).toEqual(0);
    });
  })
});
