/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

async function displayCommits() {
  try {
    const user = await getUser(1);
    console.log(user.gitUsername);
    const repos = await getRepos(user.gitUsername);
    console.log(respos);
    const commits = getCommits(repos[0]);
    console.log(commits);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}
displayCommits();

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading a user from database');
      resolve({ id: id, gitUsername: 'kinjal' });
    }, 2000);
  });
}

function getRepos(username) {
  return new Promise((resolve, reject) => {
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
