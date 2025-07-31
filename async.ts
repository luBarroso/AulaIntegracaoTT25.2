// const getData = () => {
//   console.log("entando na promise:");
//   const promise = new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Data received");
//     }, 5000);
//   });
//   console.log("chekpoint");
//   return promise;
// };

// getData().then((result) => {
//   console.log(result);
// });

function getData() {
  console.log("entando na promise:");
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data received");
    }, 3000);
  });
  console.log("checkpoint");
  return promise;
}

async function main() {
  const result = await getData();
  console.log(result);
}

main();
