import React from 'react'
import Quote from '../models/Quote'

class Quotes extends React.Component {

  constructor () {
    super()
    this.state = {
      quote: '',
      author: '',
      image: '',
      category: ''
    }
  }

  componentWillMount () {
    var _this = this
    var quote = new Quote()
    quote.getQuote(function (res, body) {
      var data = JSON.parse(body)
      _this.setState({
        quote: data.contents.quotes[0].quote,
        author: data.contents.quotes[0].author,
        image: data.contents.quotes[0].background,
        category: data.contents.quotes[0].category
      })
    })
  }

  render () {
    var styles = {
      // height: '45vh',
      border: 'solid 1px darkgrey'
    }
    return (
      <div className='card' style={styles}>
        <div className='card-image'>
          <img src={this.state.image} className='img-responsive' />
        </div>
        <div className='card-header text-center'>
          <h4 className='card-title'>{this.state.author}</h4>
          <h6 className='card-meta'>{this.state.category}</h6>
        </div>
        <div className='card-body'>
          {this.state.quote}
        </div>
      </div>
    )
  }
}

export default Quotes
