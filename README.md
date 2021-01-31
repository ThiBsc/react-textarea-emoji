# react-textarea-emoji

> Text Area to use emojis while typing

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/mit) [![NPM](https://img.shields.io/npm/v/react-textarea-emoji.svg)](https://www.npmjs.com/package/react-textarea-emoji) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[Demo page](https://thibsc.github.io/react-textarea-emoji/)  
<kbd>↑</kbd>/<kbd>↓</kbd> Move the selection in the emoji list  
<kbd>Enter</kbd> Validate the selection  
<kbd>Escape</kbd> Leave the emoji list selection

## Install

```bash
npm install --save react-textarea-emoji
```

## Props

| Name | Description |
|---|---|
|textAreaStyle| Set a particular style to the textarea

## Usage

```jsx
import React, { Component } from 'react'

import { TextAreaEmoji } from 'react-textarea-emoji'
import 'bootstrap/dist/css/bootstrap.min.css'

class Example extends Component {
  render() {
    return (
      <TextAreaEmoji
        style={{
          position: 'fixed',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        textAreaStyle={{
          fontSize: '20pt',
        }}/>
    );
  }
}

export default Example
```

## Emojis
The emoji list is actually small, to increase the possibility, just complete the file by adding a json object in the emojis object array:
```json
{"char": "🌷", "name": "tulip", "shortname": ":tulip:", "unicode": "1f337"}
```
