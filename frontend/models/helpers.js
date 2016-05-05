
function setUrl () {
  var link = window.location.href.split('/')
  return 'http://' + link[2]
}

export default {setUrl: setUrl}
