import React from 'react';
import Combine from '@ucloud-fe/react-components/lib/components/Combine';
import Button from '@ucloud-fe/react-components/lib/components/Button';
import Box from '@ucloud-fe/react-components/lib/components/Box';
import Table from '@ucloud-fe/react-components/lib/components/Table';
import ActionList from '@ucloud-fe/react-components/lib/components/ActionList';
import Loading from '@ucloud-fe/react-components/lib/components/Loading';
import Card from '@ucloud-fe/react-components/lib/components/Card';
import Drawer from '@ucloud-fe/react-components/lib/components/Drawer';
import Modal from '@ucloud-fe/react-components/lib/components/Modal';
import Notice from '@ucloud-fe/react-components/lib/components/Notice';
import DateTime from '../utils/DateTime';
import Message from '@ucloud-fe/react-components/lib/components/Message';
import data from '../data/tableData.json';
import Container from './blackList';
import HeaderPage from './header';
import service from '../utils/service';
import _ from 'lodash';
const STATUS = {
  10: '待审核',
  20: '审核通过',
  30: '审核不通过'
}
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource: data.list,
      drawerVisible: false,
      blackModal: false,
      rejectModal: false,
      modalComponent:null,
      pagination: {
        total: 0,
        current: 1,
        pageSize: 5,
        onChange: (...args) => this.handlePaginationChange(...args),
        onPageSizeChange: (...args) => this.handlePaginationChange(...args)
      }
    };
  }
  componentDidMount() {
    //调取接口获取数据
    //this.fetch();
  }
  //请求接口数据
  fetch() {
    let {
      order,
      filters,
      searchValue,
      pagination: { current, pageSize },
      dataSource
    } = this.state;
    const params = {
      Order: order,
      Filters: _.map(filters, filter => {
        return {
          Key: filter.key,
          Option: filter.value
        };
      }),
      Search: searchValue,
      Current: current,
      Limit: pageSize
    };
    //搜索
    if(searchValue){
      dataSource = dataSource.filter(function(item){
        if(item.name.indexOf(searchValue)>-1 || item.Id.indexOf(searchValue)>-1 || item.phone.indexOf(searchValue)>-1 || item.content.indexOf(searchValue)>-1){
          return true
        }
      })
      this.setState({
        dataSource:dataSource,
        pagination: { current, total:dataSource.length ,pageSize:pageSize},
      })
    }else{
      this.setState({
        dataSource:data.list,
      })
    }
    console.log('params: ', params);
    // this.setState({
    //   loading: true
    // });
    // service({
    //   method: 'get',
    //   url: '/api',
    //   data: {
    //     ...params
    //   }
    // })
    //   .then((response) => {
    //     console.log(response)
    //   })
    //   .catch((e) => Message['error'](<div>{e}</div>, undefined, () => console.log('onClose')))

  }
  handlePaginationChange(current, pageSize) {
    this.setState(
      {
        pagination: { ...this.state.pagination, current, pageSize }
      },
      () => {
        this.fetch();
      }
    );
  }
  handleConditionChange(condition) {
    this.setState(
      {
        ...condition
      },
      () => {
        this.fetch();
      }
    );
  }
  getActionList = (val) => {
    let btnList = []
    switch (val.status) {
      case 10:
        btnList = [{
          label: '通过',
          styleType: 'primary',
          onClick: (record) => {
            Message['success'](<div>已经点击通过</div>, undefined, () => console.log('onClose'))
          },
        },
        {
          label: '不通过',
          onClick: (record) => {
            this.setState({
              rejectModal:true,
              modalComponent:record
            })
           },
        }, {
          label: '拉黑',
          onClick: (record) => { 
            this.setState({
              blackModal:true,
              modalComponent:record
            })
          },
        }];
        break;
      case 30:
        btnList = [{
          label: '撤回',
          onClick: (record) => {
            Message['success'](<div>已经点击撤回</div>, undefined, () => console.log('onClose'))
           },
        },];
        break;
      default:
        break;
    }
    return (<ActionList
      style={{ minWidth: '110px', maxWidth: '150px' }}
      size="sm"
      exposeCount={2}
      actionList={btnList.map((item) => ({
        label: item.label,
        onClick: () => item.onClick(val),
      }))}
    />)
  }
  getmodalComponent = (type) => {
    let record = this.state.modalComponent
    if (record) {
      let result = type ? (<Box key={record.Id} style={{padding:24}}><div>{record.name}</div>
      </Box>) : (<Box key={record.Id} style={{padding:24}}><div>{record.name}</div>
                <div style={{margin:"20px 0"}}>{record.content}</div>
                </Box>)
      return result
    }
    return null
  }
  getTotal = (type) => {
    let number = 0
    switch (type) {
      case '待审核':
        number = data.unAuditNumber;
        break;
      case '审核不通过':
        number = data.rejectNumber;
        break;
      case '审核通过':
        number = data.auditPassNumber;
        break;
      default:
    }
    return number
  }
  onCloseBlack = ()=>{
    this.setState({
      blackModal:false,
      modalComponent:null
    })
  }
  onOkBlack = ()=>{
    this.setState({
      blackModal:false,
      modalComponent:null
    })
  }
  onCloseReject = ()=>{
    this.setState({
      rejectModal:false,
      modalComponent:null
    })
  }
  onOkReject = ()=>{
    this.setState({
      rejectModal:false,
      modalComponent:null
    })
  }
  render() {
    const { drawerVisible, dataSource, pagination, loading, blackModal, rejectModal } = this.state;
    const columns = [
      {
        title: '用户名及ID',
        dataIndex: 'name',
        key: 'name',
        width: 150,
        render: (value, val) => {
          return <div>
            <div>{value}</div>
            <div>{val.Id}</div>
          </div>
        }
      },
      {
        title: '联系电话',
        dataIndex: 'phone',
        key: 'phone',
        width: 200,
        render: (value, val) => value.map(item => <div>{item};</div>)
      },
      {
        title: '内容',
        key: 'content',
        dataIndex: 'content',
        width: 400,
      },
      {
        title: '发表时间',
        key: 'createTime',
        dataIndex: 'createTime',
        order: true,
        render: (value) => <DateTime timestamp={value * 1000} showTime />,
      },
      {
        title: '更新时间',
        key: 'updateTime',
        dataIndex: 'updateTime',
        order: true,
        render: (value) => <DateTime timestamp={value * 1000} showTime />,
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        filter: {
          options: Object.keys(STATUS).map(item => {
            return {
              label: STATUS[item],
              value: item,
            }
          }),
          multiple: true
        },
        render: (value, row) => {
          let color, text;
          text = STATUS[value];
          switch (value) {
            case 10:
              color = 'gray'
              break
            case 20:
              color = 'blue'
              break
            case 30:
              color = 'green'
              break
            default:
              color = 'black'
          }
          return (
            <Combine className="status-wrap" style={{ minWidth: '110px', maxWidth: '150px' }}>
              <span className={` status-icon ${color}`}>·</span>
              <span>{text}</span>
            </Combine>
          )
        },
      },
      {
        title: '操作',
        key: 'status+operate',
        dataIndex: 'status',
        width: 200,
        render: (status, val) => this.getActionList(val)
      }
    ];
    return (<div>
      <HeaderPage {...this.props}/>
      <Card style={{ padding: 24 }}>
        <Loading loading={loading} tip="Loading ...">
          <Table
            title={() => {
              return (
                <div className="clear-fixed">
                  <div style={{ float: 'left' }}>
                    <Box container direction={'row'} spacing="md">
                      {['待审核', '审核通过', '审核不通过'].map(v => (
                        <div
                          key={v}
                          className="number-wrap"
                        >
                          <span className='number-type'>{v}</span>(<span className='number-total'>{this.getTotal(v)}</span>)
                        </div>
                      ))}
                    </Box>
                  </div>
                  <div style={{ float: 'right' }}>
                    <Table.SearchInput style={{ marginRight: 8, width: 300 }} placeholder={"请输入用户名/ID/联系电话/内容"} />
                    <Button onClick={() => this.setState({ drawerVisible: true })}>黑名单</Button>
                  </div>
                </div>
              );
            }}
            rowSelectionSelectedTip={false}
            rowKey="Id"
            pagination={pagination}
            dataSource={dataSource}
            scroll={{ y: 600 }}
            columns={columns}
            onConditionChange={condition => {
              console.log(condition);
              this.handleConditionChange(condition);
            }}
            doNotHandleCondition
          />
        </Loading>
        <Drawer
          visible={drawerVisible}
          onClose={() => this.setState({ drawerVisible: false })}
          width="50%"
          keyboard
          maskClosable
        >
          <Container />
        </Drawer>
        <Modal
          title="提示"
          visible={blackModal}
          onClose={this.onCloseBlack}
          onOk={this.onOkBlack}
        >
          <Notice closable={false} styleType="warning"> 是否确定拉黑此用户？拉黑后用户将无法使用小程序。</Notice>
          {this.getmodalComponent(1)}
        </Modal>
        <Modal
          title="提示"
          visible={rejectModal}
          onClose={this.onCloseReject}
          onOk={this.onOkReject}
        >
          <Notice closable={false} styleType="warning"> 是否确定驳回此条求助信息/帮助说明？</Notice>
          {this.getmodalComponent(0)}
        </Modal>
      </Card></div>
    );
  }
}
export default Home

