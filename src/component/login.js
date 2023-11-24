/*
 * @Author: qianhua.xiong
 */
import React from 'react';
import { connect } from "react-redux";
import { setUserLoginData} from '../actionCreator/index';
import Input from '@ucloud-fe/react-components/lib/components/Input';
import Button from '@ucloud-fe/react-components/lib/components/Button';
import Message from '@ucloud-fe/react-components/lib/components/Message';
import Logo from '../images/logo.png';
import { UserLogin } from '@ucloud/ucloud-icons/dist/uc-user/svgr';
import { IdCardCheck } from '@ucloud/ucloud-icons/dist/uc-user/svgr';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      isLogin: true,
      errorMsg: ""
    };
  }
  onLoginClick = () => {
    let { name, password } = this.state
    if (!name || !password) {
      this.setState({ errorMsg: "请输入用户名和密码" })
    }
    if(name === 'admin' && password === '123456'){
      let params = { name,password }
      this.props.setUserLoginData(params)
      this.props.router.navigate('/home')
    }else{
      this.setState({ errorMsg: "用户名或密码错误！" })
    }
  }
  changeLoginStatus = () => {
    let { name, password } = this.state
    if (name && password) {
      this.setState({ errorMsg: "", isLogin: false })
    }
  }
  render() {
    let { isLogin, name, password, errorMsg } = this.state
    return (
      <div className='login-wrap'>
         <div className="logo-img">
         <img src={Logo}/>
         </div>
        <div className="logo-title">XXX审核平台</div>
        <Input
          value={name}
          onChange={(e) => { this.changeLoginStatus();this.setState({ name: e.target.value });  }}
          block
          size="lg"
          style={{height:40}}
          prefix={<UserLogin style={{ color: '#3860F4' }} />}
          placeholder="admin"
        ></Input>
        <div className='login-subtitle'>密码</div>
        <Input
          prefix={<IdCardCheck style={{ color: '#3860F4' }} />}
          value={password}
          onChange={(e) => {this.changeLoginStatus(); this.setState({ password: e.target.value }); }}
          size="lg"
          block
          style={{height:40}}
          placeholder="123456"
        ></Input>
        <div className='error-tip'>{errorMsg}</div>
        <Button disabled={isLogin} block onClick={this.onLoginClick} className="login-btn" styleType="primary" size="lg">
          登录
        </Button>
      </div>
    );
  }
}
const mapStateToProps = ({userDataReducer}) => {
	return {
    ...userDataReducer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {setUserLoginData: (data) => dispatch(setUserLoginData(data))}
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)