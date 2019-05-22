function GenerateSeed() {
  var now = new Date();
  return " " + now.getFullYear() + " " + now.getMonth();
}

module.exports = GenerateSeed;
