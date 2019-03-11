var request = require("request");
var secrets = require("./secrets");
var fs = require("fs");


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
  if (!err) {
    var output = JSON.parse(result);
    for (var i = 0; i < output.length; i++) {
      console.log(output[i].avatar_url);
    }
  } else {
    throw err;
  }



  // console.log("Errors:", err);
  // console.log("Result:" result);
});

function downloadImageByURL(url, filePath) {
  request.get(url + filePath)
    .on("error", function (err) {
      throw err;
    })
    .on("response", function (response) {
      console.log("Status Code: ", response.statusCode);
      return response.avatar_url;
    })
    .pipe(fs.createWriteStream("./image.jpg"))
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");

