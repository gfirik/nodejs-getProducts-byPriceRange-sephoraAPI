module.exports = function (str) {
  const nums = str.split(" - ");
  if (nums.length > 1) {
    const average =
      (parseInt(nums[0].slice(1)) + parseInt(nums[1].slice(1))) / 2;
    return `$${Number(average).toFixed(2)}`;
  } else {
    return nums[0];
  }
};
