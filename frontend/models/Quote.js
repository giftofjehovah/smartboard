var request = require('request')

class Quote {

  getQuote (cb) {
    request.get('http://quotes.rest/qod.json', function (err, res, body) {
      if (err) throw err
      cb(res, body)
    })
  }
}

export default Quote
