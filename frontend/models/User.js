var request = require('ajax-request')
var url = 'http://localhost:3000'

class User {
  constructor (firstName, lastName, email, password) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
  }

  signUp (cb) {
    var data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    }
    var signUpUrl = url + '/signup'

    request({
      url: signUpUrl,
      method: 'POST',
      data: data
    }, function (err, res, body) {
      if (err) throw err
      cb(res, body)
    })
  }

  login (cb) {
    var data = {
      email: this.email,
      password: this.password
    }
    var loginUrl = url + '/login'

    request({
      url: loginUrl,
      method: 'POST',
      data: data
    }, function (err, res, body) {
      if (err) throw err
      cb(res, body)
    })
  }
}

export default User
