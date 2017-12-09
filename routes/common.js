const store = require('../models/post')
function isNumber(n)  {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
module.exports = {
  isNumber: isNumber,

  retrievePost: (postId) => {
    let data = store.posts
    if (postId) {
      const index = parseInt(postId)
      if (isNumber(index)) {
        return store.posts[index]
      } else {
        return undefined
      }
    } else {
      return store.posts
    }
  }
}
