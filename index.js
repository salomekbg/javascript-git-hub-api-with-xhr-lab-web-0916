function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(repo => '<li>' + repo.name + ' - <a href=' + repo.html_url + ' target="_blank">Link</a></li>' + ' - <a href="#" data-repo="' + repo.name + '" onclick="getCommits(this)">Get Commits</a></li>' + ' - <a href="#" data-repo="' + repo.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayCommits(event, data) {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.committer.login + ' - ' + commit.commit.author.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}

function getCommits(el) {
  const name = el.dataset.repo;
  const username = document.getElementById('username').value
  const url = 'https://api.github.com/repos/'
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", url + username + '/' + name + '/commits');
  req.send();
}

function displayBranches(event, data) {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong>').join('')}</ul>`;
  document.getElementById("details").innerHTML = branchesList;
}

function getBranches(el) {
  const name = el.dataset.repo;
  const username = document.getElementById('username').value
  const url = 'https://api.github.com/repos/'
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", url + username + '/' + name + '/branches');
  req.send();
}
