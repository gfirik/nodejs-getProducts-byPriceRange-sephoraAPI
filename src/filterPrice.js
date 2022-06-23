// create a function that receives minimum and maximum price and price array and returns the filtered array
const filterPrice = (min, max, arr) => {
  return arr.filter((item) => item >= min && item <= max);
};
