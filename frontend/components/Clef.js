import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import scriptLoader from 'react-async-script-loader'

class ClefButton extends Component {

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.init()
      } else this.props.onError()
    }
  }

  componentDidMount () {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.init()
    }
  }

  init () {
    window.ClefButton.initialize({ el: ReactDOM.findDOMNode(this) })
  }

  render () {
    return (
      <div
        data-app-id={this.props.appID}
        data-redirect-url={this.props.redirectURL}
        data-state={this.props.state}
        data-color={this.props.color}
        data-type={this.props.type}
        data-custom={this.props.custom}
        data-embed={this.props.embed}
      ></div>
    )
  }
}
ClefButton.propTypes = {
  appID: React.PropTypes.string.isRequired,
  redirectURL: React.PropTypes.string.isRequired,
  state: React.PropTypes.string.isRequired,
  color: React.PropTypes.string,
  type: React.PropTypes.string,
  custom: React.PropTypes.bool,
  embed: React.PropTypes.bool,
  isScriptLoaded: React.PropTypes.bool,
  isScriptLoadSucceed: React.PropTypes.bool,
  onError: React.PropTypes.bool
}
ClefButton.SCRIPT_URL = 'https://clef.io/v3/clef.js'

export default scriptLoader([ClefButton.SCRIPT_URL])(ClefButton)
