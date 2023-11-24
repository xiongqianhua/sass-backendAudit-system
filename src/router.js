import React from 'react'
import {Routes,Route } from 'react-router-dom'
import Home from './component/home'
import Login from './component/login'
class RouterPage extends React.Component {
  constructor(props) {
		super(props)
    this.state = {}
	}
  render() {
    return (
      <Routes>
        <Route path='/' element={<Login {...this.props}/>}/>
        <Route path='/login' element={<Login {...this.props}/>}/>
        <Route path='/home' element={<Home {...this.props}/>}/>
      </Routes>   
  )
  }
}

export default RouterPage