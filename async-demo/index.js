console.log('before');
getUser(1, user => {
  console.log('User', user);
});
console.log('after');

function getUser(id, callback) {
  setTimeout(() => {
    console.log('Reading a user from database');
    callback({ id: id, gitUsername: 'kinjal' });
  }, 2000);
}
