// var request = require("request");
// var secrets = require("./secrets");
// var fs = require("fs");

// function getRepoContributors(repoOwner, repoName, cb) {
//   var options = {
//     url:"https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
//     headers: {
//       "User-Agent": "request",
//       Authorization: "token" + secrets.GITHUB_TOKEN
//     }
//   };

//   request(options, function(err, res, body) {
//     cb(err, body);
//   });
// }

// getRepoContributors("jquery", "jquery", function(err, result) {
//   if (!err) {
//     var output = JSON.parse(result);
//     for (var i = 0; i < output.length; i++) {
//       downloadImageByURL(output[i].avatar_url, "avatars/" + output[i].login + ".jpg");
//     }
//   } else {
//     throw err;
//   }
// });

// function downloadImageByURL(url, filePath) {
//   request
//     .get(url + filePath)
//     .on("error", function(err) {
//       throw err;
//     })
//     .on("response", function(response) {
//       return response.avatar_url;
//     })
//     .pipe(fs.createWriteStream(filePath));
// }

var request = require("request");
var secrets = require("./secrets");
var fs = require("fs");
var owner = process.argv[2];
var repo = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      "Authorization": "token " + secrets.GITHUB_TOKEN
    }
  };
  request(options, function (err, res, body) {
    cb(err, body);
  });
}

getRepoContributors(owner, repo, function (err, result) {
  if (!err && owner && repo) {
    var urlObj = JSON.parse(result);

    for (var i = 0; i < urlObj.length; i++) {
      downloadImageByURL(urlObj[i].avatar_url, "avatars/" + urlObj[i].login + ".jpg");
    }
  } else {
    throw err;
  }
});

function downloadImageByURL(url, filePath) {
  request
    .get(url + filePath)
    .on("error", function (err) {
      throw err;
    })
    .on("response", function (res) {
      return res.avatar_url;
    })
    .pipe(fs.createWriteStream(filePath));
}
console.log("downloading avatars...")