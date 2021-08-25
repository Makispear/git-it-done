var userFormEl = document.querySelector("#user-form")
var nameInputEl = document.querySelector("#username")
//changed from querySelector
var repoContainerEl = document.getElementById("repos-container");
var repoSearchTerm = document.getElementById("repo-search-term");


// FUNCTION THAT HANDLES SUBMITTING FORM
var formSubmitHandler = (event) => {
  event.preventDefault()
  let username = nameInputEl.value.trim()
  if (username) {
    getUserRepos(username)
    nameInputEl.value = ""
  } else {
    alert('Please enter a GitHub username')
  }
  console.log(event)
}
// FETCH GITHUB REPO FUNCTION
var getUserRepos = (user) => {
    var apiUrl = `https://api.github.com/users/${user}/repos`
    fetch(apiUrl)
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data)
          displayRepos(data, user);
        });
      } else {
        alert('Error: GitHub User Not Found');
      }
    })
    .catch((error) => {
      alert(`Unable to connect to GitHub`);
    });
  }
// AFTER SUBMITTING 
userFormEl.addEventListener("submit", formSubmitHandler)
//DISPLAY REPO ON PAGE
let displayRepos = (repos, searchTerm) => {
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;
  //loop repos and display them
  for (var i = 0; i < repos.length; i++) {
    var repoName = `${repos[i].owner.login}/${repos[i].name}`;
    var repoEl = document.createElement("a");
    repoEl.classList = `list-item flex-row justify-space-between align-center`;
    repoEl.setAttribute('href', `./single-repo.html?repo=${repoName}`)
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;
    repoEl.appendChild(titleEl);
    repoContainerEl.appendChild(repoEl);
  // create a status element
  var statusEl = document.createElement("span");
  statusEl.classList = "flex-row align-center";
  if (repos[i].open_issues_count > 0) {
    statusEl.innerHTML =`<i class='fas fa-times status-icon icon-danger'></i>"${repos[i].open_issues_count} issue(s)`;
  } else {
    statusEl.innerHTML = `<i class='fas fa-check-square status-icon icon-success'></i>`;
  }
  repoEl.appendChild(statusEl);
}
}

