let userName = document.querySelector("#user-form #username");
let getUserButton = document.querySelector("#user-form #get-user");
let languagesButtons = document.querySelector(".language");
let languageTitle = document.querySelector(".results #lang");
let reposLinks = document.querySelector(".results .repos");

getUserButton.addEventListener("click", formSubmit);
languagesButtons.addEventListener("click", languageChoice);

function languageChoice(e) {
  let language = e.target.getAttribute("data-lang");

  languageTitle.innerHTML = language;

  getLangRepos(language);
}

function getLangRepos(lang) {
  const api = "https://api.github.com/search/repositories?q=";
  let repoUserUrl = `${api}language:${lang}`;

  reposLinks.innerHTML = "";

  fetch(repoUserUrl)
    .then((response) => response.json())
    .then((repos) => displayRepos(repos.items))
    .catch((error) => {
      Swal.fire({
        text: "Error fetching user repositories. Please try again later.",
        icon: "error",
      });
    });
}

function formSubmit(e) {
  e.preventDefault();

  inCaseOfEmptyInput();
}

function inCaseOfEmptyInput() {
  if (userName.value === "") {
    Swal.fire({
      text: "Please Write Your Github Username",
      icon: "warning",
    });
  } else {
    getRepoUser(userName.value);
  }
}

function getRepoUser(username) {
  const api = "https://api.github.com/users/";
  let repoUserUrl = `${api}${username}/repos`;

  reposLinks.innerHTML = "";

  fetch(repoUserUrl)
    .then((response) => response.json())
    .then((repos) => displayRepos(repos))
    .catch((error) => {
      Swal.fire({
        text: "Error fetching user repositories. Please try again later.",
        icon: "error",
      });
    });
}

function displayRepos(repos) {
  if (repos.length === 0) {
    reposLinks.innerHTML = "No Repos";
    return;
  }

  repos.forEach((repo) => {
    let repoLink = document.createElement("a");
    repoLink.className = "repo-item";
    repoLink.href = `./repo_issue.html?repo=${repo.owner.login}/${repo.name}`;

    let repoNameConainer = document.createElement("span");
    let repoName = document.createTextNode(
      `${repo.owner.login} / ${repo.name}`
    );
    repoNameConainer.appendChild(repoName);

    let repoIssue = document.createElement("span");
    repoIssue.innerHTML = repo.open_issues_count
      ? '<i class="fa-solid fa-check"></i>'
      : '<i class="fa-solid fa-xmark"></i>';

    repoLink.appendChild(repoNameConainer);
    repoLink.appendChild(repoIssue);

    reposLinks.appendChild(repoLink);
  });
}
