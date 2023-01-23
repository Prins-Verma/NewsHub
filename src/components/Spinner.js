import React, { Component } from 'react'
// import Spinner from 'react-spinkit';
// import loading from "./loading.gif"


export default class Spinner extends Component {
  render() {
    return (
      <div className= "text-center">
            <img src= "loading.gif" alt="loading" />
       </div>
    )
  }
}
