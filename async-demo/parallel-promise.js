/* eslint-disable no-console */
const p1 = new Promise(resolve => {
  setTimeout(() => {
    console.log('Async oper1');
    resolve(1);
    //    reject(new Error('error in async 1'));
  }, 2000);
});

const p2 = new Promise(resolve => {
  setTimeout(() => {
    console.log('Async oper2');
    resolve(2);
  }, 2000);
});

// Promise.all([p1, p2])
//   .then(result => console.log(result))
//   .catch(err => console.log(`Error: ${err.message}`));

Promise.race([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log(`Error: ${err.message}`));
