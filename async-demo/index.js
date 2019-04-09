// console.log('before');
// getUser(1, getRepos);
// console.log('after');

// function getRepos(user) {
//   getRepos(user.gitUsername, getCommits);
// }

// function getCommits(repos) {
//   getCommits(repo, displayCommits);
// }

// function displayCommits(commits) {
//   console.log(commits);
// }

getUser(1)
  .then(user => getRepos(user.gitUsername))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log(`Commits : ${commits}`))
  .catch(err => console.log(`Error: ${err.message}`));

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading a user from database');
      resolve({ id: id, gitUsername: 'kinjal' });
    }, 2000);
  });
}

function getRepos(username) {
  return new Promise((request, response) => {
    setTimeout(() => {
      console.log('Reading repos API');
      resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
  });
}

function getCommits(respo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Getting github API');
      resolve(['commit']);
    }, 2000);
  });
}
