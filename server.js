const axios = require("axios");
const priceCutter = require("./src/priceCutter.js");
//this is function receives price string and returns the average price if there is more than one price

const url = "https://sephora.p.rapidapi.com/products/list";
// api.ecommerce.com/products wasn't working properly, so I used sephora.p.rapidapi.com/products/list,
// but this api doesn't provide query string options
const headers = {
  "X-RapidAPI-Key": "0e6a09556emsh91125054d684471p19ff4ejsn9aede723c751",
  "X-RapidAPI-Host": "sephora.p.rapidapi.com",
};

const categories = [
  "cat130044",
  "cat60270",
  "cat140006",
  "cat3780034",
  "cat150006",
  // "cat130038",
  // "cat130042",
  // "cat160006",
  // "cat140014",
  // "cat1830032",
  // this api has a several categories and in order to get all of we have to fetch them with different params
  // so I created this array, and enabled only 5 of them is request limit per second is 5
];

async function getAllPrices() {
  let allProducts = []; // this array will contain all the products
  await Promise.all(
    // as I am fetching as many categories as I have, I am mapping them to a single promise
    categories.map(async (i) => {
      // I didn't use for loop as it waits for each promise to be resolved before moving to the next one
      await axios
        .get(url, {
          params: { categoryId: i },
          headers,
        })
        .then((response) => {
          const data = response.data.products;
          allProducts = [...allProducts, ...data]; // I am adding all the products to the array
          console.log(`${i} category is fetched`);
        })
        .catch((error) => {
          console.log(error);
        });
    })
  );
  return allProducts;
}

const minPrice = 60; // minimum price, you can change it as you want
const maxPrice = 70; // maximum price, you can change it as you want
getAllPrices().then((data) => {
  console.log(
    `Returning prices between ${minPrice} and ${maxPrice}`, // I am printing the prices
    {
      // Printing the result as requested in the task
      total: data.length,
      count: data.filter(
        // filtering the products count by price range
        (item) =>
          Number(item.currentSku.listPrice.slice(1)) >= minPrice &&
          Number(item.currentSku.listPrice.slice(1)) <= maxPrice
      ).length,
      products: data.filter(
        // filtering the products by price range
        (item) =>
          Number(item.currentSku.listPrice.slice(1)) >= minPrice &&
          Number(item.currentSku.listPrice.slice(1)) <= maxPrice
      ),
    }
  );
});
