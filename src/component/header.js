import React from 'react';
import { setUserLoginData} from '../actionCreator/index';
import { connect } from "react-redux";
import Box from '@ucloud-fe/react-components/lib/components/Box';
import Img from '../images/profile.png';
import Logo from '../images/logo.png';
import _ from 'lodash';
class Hearder extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name : this.props?.userLoginData?.name || '登录失效'
    };
  }
  componentDidMount(){
    //此处可以请求接口判断登录状态是否失效
  }
  logoff = ()=>{
    this.props.setUserLoginData({})
    this.props.router.navigate('/login')
  }
  render() {
    return (
     <div className = "header-wrap">
        <div className='header-logo'><img src={Logo}/></div>
        <div className='header-title'>XXX审核平台</div>  
        <Box container direction={'row-reverse'} spacing="md">
        <div className='log-off' onClick={this.logoff}>退出登录</div>
          <div className='login-user'>{this.state.name}</div>
          <div className='login-img'>
            <img src={Img}/>
          </div>
        </Box>
     </div>      
    );
  }
}

const mapStateToProps = ({userDataReducer}) => {
	return {
    userLoginData: userDataReducer.userLoginData
  }
}
const mapDispatchToProps = (dispatch) => {
  return {setUserLoginData: (data) => dispatch(setUserLoginData(data)),
  }
}
const HeaderContiner = connect(mapStateToProps,mapDispatchToProps)(Hearder)

export default HeaderContiner;