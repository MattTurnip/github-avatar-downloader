var request = require("request");
var secrets = require("./secrets")
console.log(secrets.GITHUB_TOKEN)

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token" + secrets.GITHUB_TOKEN
    }
  };

  request(options, function (err, res, body) {
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function (err, result) {
  var output = JSON.parse(result);
  for (var i = 0; i < output.length; i++) {
    console.log(output[i].avatar_url);
  }


  console.log("Errors:", err);
  console.log("Result:");
});
