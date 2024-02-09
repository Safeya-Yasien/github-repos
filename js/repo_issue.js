let reposLinks = document.querySelector(".results .repos");

function getRepoName() {
  let urlSearch = document.location.search;

  let repoName = urlSearch.split("=")[1];

  if (repoName) {
    getIssues(repoName);
  }
}

getRepoName();

function getIssues(repoName) {
  let apiUrl = `https://api.github.com/repos/${repoName}/issues`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((issues) => displayIssues(issues));
}

function displayIssues(issues) {
  if (issues.length === 0) {
    reposLinks.innerHTML = "No Issues";
    return;
  }

  issues.forEach((issue) => {
    let issueLink = document.createElement("a");
    issueLink.className = "repo-item";
    issueLink.href = `${issue.html_url}`;

    let repoIssueContainer = document.createElement("span");
    let repoIssue = document.createTextNode(`${issue.title}`);
    repoIssueContainer.appendChild(repoIssue);

    issueLink.appendChild(repoIssueContainer);

    reposLinks.appendChild(issueLink);
  });
}
