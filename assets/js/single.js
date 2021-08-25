var issueContainerEl = document.querySelector("#issues-container")
var limitWarningEl = document.querySelector('#limit-warning')
var repoNameEl = document.querySelector("#repo-name");
let apiUrldirection = '?direction=asc';
var getRepoName = () => {
    let queryString = document.location.search;
    let repoName = queryString.split("=")[1];
    if(repoName) {
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
      } else {
        document.location.replace("./index.html");
      }
  }


var getRepoIssues = (repo) => {
    let apiUrl = `https://api.github.com/repos/${repo}/issues${apiUrldirection}`;
    fetch(apiUrl).then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                debugger
                console.log(data)
                displayIssues(data)
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                  }
            })
        } else {
            debugger
            document.location.replace("./index.html");
        }
    })
    
}

var displayIssues = (issues) => {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!"
        return
      }
    for (let i = 0; i < issues.length; i++) {
        let issuesEl = document.createElement('a')
        issuesEl.classList = 'list-item flex-row justify-space-between align-center'
        issuesEl.setAttribute('href', issues[i].html_url)
        issuesEl.setAttribute('target', '_blank')
        let titleEl = document.createElement('span')
        titleEl.textContent = issues[i].title
        issuesEl.appendChild(titleEl)
        let typeEl = document.createElement("span")
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)"
        } else {
            typeEl.textContent = "(Issue)"
        }
        issuesEl.appendChild(typeEl)
        issueContainerEl.appendChild(issuesEl)
    }
}

let displayWarning = (repo) => {
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    let linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", `https://github.com/${repo}/issues`)
    linkEl.setAttribute("target", "_blank");
    limitWarningEl.appendChild(linkEl);
}

getRepoName('microsoft/activities')
