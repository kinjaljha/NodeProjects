/* eslint-disable no-console */

// following is used only when promises are alreadyresolved

const p = Promise.resolve({ id: 1 });
p.then(result => {
  console.log(result);
});

// following is used only when promises are already rejected

const p1 = Promise.reject(new Error('reason of rejection'));
//const p1 = Promise.reject('reason of rejection');
p1.catch(err => {
  console.log(err);
});
