import React from 'react'

import { TextAreaEmoji } from 'react-textarea-emoji'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-textarea-emoji/dist/index.css'

const App = () => {
  return (
    <TextAreaEmoji
      style={{
        position: 'fixed',
        top: '40%',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
      textAreaStyle={{
        fontSize: '20pt',
      }}/>
  );
}

export default App
