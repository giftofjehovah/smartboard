import React from 'react'
import Tweets from './Tweets'
import Time from './Time'
import Weather from './Weather'
import News from './News'
import Calendar from './Calendar'
import Quotes from './Quotes'
import annyang from 'annyang'
// var SpeechKITT = require('speechkitt')

class Dashboard extends React.Component {
  componentDidMount () {
    if (annyang) {
      var commands = {
        'hi': function () {
          window.alert('hello world')
        }
      }
      annyang.addCommands(commands)
      SpeechKITT.annyang()
      SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css')
      SpeechKITT.vroom()
    }

//     var recognition = new webkitSpeechRecognition();
//
// recognition.onstart = function(event){
//     console.log("onstart", event);
// }
//
// // Process parsed result
// recognition.onresult = function(event){
//     console.log("onresult", event);
// }
//
// // Handle error
// recognition.onerror = function(event){
//     console.log("onerror", event);
// }
//
// // Housekeeping after success or failed parsing
// recognition.onend = function(){
//     console.log("onend");
// }
// recognition.start();

// Tell KITT the command to use to start listening
// SpeechKITT.setStartCommand(function() {recognition.start()});
//
// // Tell KITT the command to use to abort listening
// SpeechKITT.setAbortCommand(function() {recognition.abort()});
//
// // Register KITT's recognition start event with the browser's Speech Recognition
// recognition.addEventListener('start', SpeechKITT.onStart);
//
// // Register KITT's recognition end event with the browser's Speech Recognition
// recognition.addEventListener('end', SpeechKITT.onEnd);
// SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');
//
// // Render KITT's interface
// SpeechKITT.vroom();
  }

  render () {
    return (
  <div className='container'>
    <div className='columns'>
      <div className='column col-3'>
        <div className='columns'>
          <div className='column col-12'>
            <Tweets/>
          </div>
        </div>
      </div>
      <div className='column col-6'>
        <div className='columns'>
          <div className='column col-6'>
            <Time/>
          </div>
          <div className='column col-6'>
            <Weather/>
          </div>
        </div>
        <div className='columns'>
          <div className='column col-6'>
            <Calendar/>
          </div>
          <div className='column col-6'>
            <Quotes/>
          </div>
        </div>
      </div>
      <div className='column col-3'>
        <div className='columns'>
          <div className='column col-12'>
            <News/>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
  }
}

export default Dashboard
