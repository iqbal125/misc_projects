// QUESTION 1/5 ----------------------------------------------------------------
function findInList(nums: number[], target: number): boolean {
  // Should return true if the target value can be found in the list, and false otherwise.
  const isinList = nums.find((x) => x === target)

  if (isinList !== undefined) return true
  return false
}

// Examples:
let result = findInList([0, 1, 2, 3, 4, 5], 0) // -> True
result = findInList([1, 2, 3, 4, 5], 8) // -> False

// QUESTION 2/5 ----------------------------------------------------------------
function targetSum(nums: number[], target: number): [number, number] | null {
  // Should return a tuple of two numbers in the list which can be added to produce
  // the target sum value, or null if no such sum is possible.

  let sumArr: Array<number> = []

  for (let i = 0; i < nums.length; i++) {
    //console.log(sumArr)
    const difference = target - nums[i]

    if (sumArr.includes(difference)) {
      return [difference, nums[i]]
    }

    sumArr.push(nums[i])
  }

  return null
}

// Examples:
result = targetSum([1, 2, 3, 4, 5], 9) // -> [4, 5]

result = targetSum([1, 2, 3, 4, 5], 10) // -> null

// QUESTION 3/5 ----------------------------------------------------------------
function stringAllUniqueCharacters(s: string): boolean {
  // Should return true if all the characters in the string are unique.

  const stringArr = s.split("")
  let uniqueArr: Array<string> = []
  let isUnique: boolean = true

  for (let i = 0; i < stringArr.length; i++) {
    if (!uniqueArr.includes(stringArr[i])) {
      uniqueArr.push(stringArr[i])
    } else {
      isUnique = false
    }
  }

  return isUnique
}

// Examples:
result = stringAllUniqueCharacters("abcdefghijklmnop") // -> True
console.log(result)
result = stringAllUniqueCharacters("abcdefghijklmnopppp") // -> False
console.log(result)

// QUESTION 4/5 ----------------------------------------------------------------
function isPalindrome(s: string): boolean {
  // Should return True if the provided str is a palindrome, which is a string of
  // text which is the same sequence of characters forward and backward, such as
  // 'radar', 'madam' or 'nurses run'. You can ignore spaces in the input string.

  return false
}

// Examples:
result = isPalindrome("hello") // -> False
result = isPalindrome("racecar") // -> True

// QUESTION 5/5 ----------------------------------------------------------------
function groupAnagrams(anagrams: string[]): string[][] {
  // Should return all the similar anagrams grouped together. An anagram is
  // a word, phrase, or name formed by rearranging the letters of another,
  // such as 'cinema', formed from 'iceman'.
  return []
}

// Examples:
result = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])
// -> [ [ 'eat', 'tea', 'ate' ], [ 'tan', 'nat' ], [ 'bat' ] ]
