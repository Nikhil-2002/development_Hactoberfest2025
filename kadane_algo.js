function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let curr = 0;
  for (let x of nums) {
    curr = Math.max(x, curr + x);
    maxSoFar = Math.max(maxSoFar, curr);
  }
  return maxSoFar;
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6
