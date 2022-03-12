import React, { Component } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ImportOutlined } from '@ant-design/icons'
import './index.css'

class Top extends Component {
  login = () => {
    this.props.router.navigate('/login')
  }

  render() {
    return (
      <div className="top">
        <div className="sign">
          <img src="http://chcmusic.cloud/images/Cat.svg" alt="" />
        </div>
        <div className="login" onClick={this.login}>
          <span>登录 </span>
          <ImportOutlined />
        </div>
      </div>
    )
  }
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation()
    let navigate = useNavigate()
    let params = useParams()
    return <Component {...props} router={{ location, navigate, params }} />
  }

  return ComponentWithRouterProp
}

export default withRouter(Top)
