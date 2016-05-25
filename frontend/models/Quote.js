var request = require('request')
import h from './helpers'

class Quote {

  getQuote (cb) {
    request.get(h.setUrl() + '/dashboard/quote', function (err, res, body) {
      if (err) throw err
      cb(res, body)
    })
  }
}

export default Quote
