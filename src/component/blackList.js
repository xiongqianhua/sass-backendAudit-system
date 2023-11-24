import React from 'react';
import Table from '@ucloud-fe/react-components/lib/components/Table';
import Button from '@ucloud-fe/react-components/lib/components/Button';
import Card from '@ucloud-fe/react-components/lib/components/Card';
import data from '../data/blackList.json';
import Loading from '@ucloud-fe/react-components/lib/components/Loading'
import _ from 'lodash';
import service from '../utils/service';
import Message from '@ucloud-fe/react-components/lib/components/Message';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: data.list,
      loading: false,
      pagination: {
        total: data.listTotal,
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
    console.log('params: ', params);
    //搜索
    if(searchValue){
      dataSource = dataSource.filter(function(item){
        if(item.name.indexOf(searchValue)>-1 || item.Id.indexOf(searchValue)>-1 || item.phone.indexOf(searchValue)>-1){
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
  delete = (Id) => {
    let data = this.state.dataSource
    this.setState({ dataSource: data.filter(function (item) { return item.Id !== Id }) })
  }
  render() {
    let { loading, pagination, dataSource } = this.state;
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
        title: '操作',
        key: 'Id',
        dataIndex: 'Id',
        width: 200,
        render: (Id, val) => <Button onClick={() => this.delete(Id)}>从黑名单中移除</Button>
      }
    ];
    return <Card>
      <Card>
        <Card.Header>黑名单</Card.Header>
      </Card>
      <Card style={{ margin: 24, padding: 12 }}>
        <Loading loading={loading} tip="Loading ...">
          <Table
            title={() => {
              return (
                <div className="clear-fixed">
                  <div style={{ float: 'left',marginBottom:31 }}>合计人数<span style={{ fontWeight: "bolder", fontSize: "18px" }}> {pagination.total}</span></div>
                  <div style={{ float: 'right',marginBottom:31 }}>
                    <Table.SearchInput style={{ width: 300 }} placeholder={"请输入用户名/ID/联系电话"} />
                  </div>
                </div>
              );
            }}
            pagination={pagination}
            rowKey="Id"            
            dataSource={dataSource}
            scroll={{ y: 600 }}
            columns={columns}
            onConditionChange={condition => {
              console.log(condition);
              this.handleConditionChange(condition);
            }}
            doNotHandleCondition
          />
        </Loading></Card> </Card>
  }
}
export default Container
