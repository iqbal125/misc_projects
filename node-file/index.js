const fs = require("fs")
const path = require("path")

const main = async (dirPath) => {
  const result = {}

  async function buildTree(currentPath, tree) {
    const items = fs.readdirSync(currentPath)
    items.forEach((item) => {
      const itemPath = path.join(currentPath, item)
      const stats = fs.statSync(itemPath)
      if (stats.isDirectory()) {
        tree[item] = {}
        buildTree(itemPath, tree[item])
      } else {
        tree[item] = "file"
      }
    })
  }

  buildTree(dirPath, result)

  //  return new Promise((resolve, reject) => {
  //    if (Object.keys(result).length === 0) {
  //      reject(new Error("Directory is empty or does not exist"))
  //    } else {
  //      resolve(result)
  //    }
  //  })

  if (Object.keys(result).length === 0) {
    throw new Error("Directory is empty or does not exist")
  } else {
    return result
  }
}

module.exports = main
