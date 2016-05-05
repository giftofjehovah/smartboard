import React from 'react'

class News extends React.Component {
  render () {
    var styles = {
      height: '93vh',
      border: 'solid 1px darkgrey'
    }
    return (
      <div className='card' style={styles}>
        <div className='card-header text-center'>
          <h4 className='card-title'><small className='card-meta'><i className='fa fa-newspaper-o fa-2x'></i> News</small></h4>
        </div>
      </div>
    )
  }
}

export default News
