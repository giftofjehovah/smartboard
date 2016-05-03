import React from 'react'

class Quotes extends React.Component {
  render () {
    var styles = {
      height: '45vh',
      border: 'solid 1px darkgrey'
    }
    return (
      <div className='card' style={styles}>
        <div className='card-header text-center'>
          <h4 className='card-title'>Quotes</h4>
        </div>
      </div>
    )
  }
}

export default Quotes
