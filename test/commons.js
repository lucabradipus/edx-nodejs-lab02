const store = require('../models/post')

const util = {
  storePost: () => {
    store.posts.push({
        name: "Top 10 ES6 Features",
        url: "http://webapplog.com/es6",
        text: ""
      }
    )
  }
}
module.exports = util
