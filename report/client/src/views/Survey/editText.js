import React, { Component } from 'react'
import EdiText from 'react-editext'
const fs = require('fs');

const editText = () => {
    // const json = require('./studentCourseEvaluation.json');

    function onSave(val) {
        console.log('Edited Value -> ', val)
        // json.title = val;
      }
      return (
        <EdiText
          type='text'
          // value= {json.title}
          onSave={onSave}
        />
      )
}
export default editText;