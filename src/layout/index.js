import { Layout } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import RouterPage from '../router';
const {  Content } = Layout;
function LayoutPage() {
  let location = useLocation();
  let navigate = useNavigate();
  let params = useParams();
  return (<Layout>
    <Content>
      <RouterPage router={{ location, navigate, params }} />
    </Content>
  </Layout>)

}
export default LayoutPage