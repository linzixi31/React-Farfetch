import React from 'react';
import { Table, Input, Button, Row, Col , Card, Modal, Affix } from 'antd';
import { getUserlist } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';
import axios from 'axios';
import http from '../../http/baseurl';
import '../../style/goodstable.less'
const columns = [{
    title: '用户名',
    dataIndex: 'username',
    width: 100,
    render: (text, record) => <a href={record.url} target="_blank">{text}</a>
}, {
    title: '电话',
    dataIndex: 'telephone',
    width: 80
}, {
    title: '电子邮箱',
    dataIndex: 'password',
    width: 80
}, {
    title: '注册时间',
    dataIndex: 'register_time',
    width: 200
}];

const confirm = Modal.confirm.bind(this);

class UserlistTable extends React.Component {
    state = {
        selectedRowKeys: [],  // Check here to configure the default column
        selectedRows:'',
        loading: false,
        data: [],
        visible: false,
        display:"none",
        del_list:[]
    };
    componentDidMount() {
        this.start();
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    start = () => {
        this.setState({ loading: true });
        this.getData();
    };

    getData(){
        getUserlist().then(res => {
            console.log(res);
            this.setState({
                data: [...res.data.results.map(val => {
                    val.key = val.id;
                    return val;
                })],
                loading: false
            });
        });
    }

    
    onSelectChange = (selectedRowKeys,selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
        this.setState({ selectedRowKeys ,selectedRows});
    };


    /**
    * 点击删除按钮, 弹出一个确认对话框
    * 注意区分单条删除和批量删除
    *
    * @param e
    */
    onClickDelete = (e) => {
        e.preventDefault();
        Modal.confirm({
            title: this.state.selectedRowKeys.length > 1 ? '确认批量删除' : '确认删除',
            content: `当前被选中的行: ${this.state.selectedRowKeys.join(', ')}`,
            // 这里注意要用箭头函数, 否则this不生效
            onOk: () => {
                this.handleDelete();
            },
        });
    };


    onClickUpdate = (e) => {
        e.preventDefault();
        this.refs.updata.style.display = 'block';
        if(this.state.selectedRowKeys.length > 0 ){
            this.refs.username.input.value = this.state.selectedRows[0].username;
            this.refs.telephone.input.value = this.state.selectedRows[0].telephone;
            this.refs.email.input.value = this.state.selectedRows[0].email;    
        }else{
            this.refs.username.input.value = '';
            this.refs.telephone.input.value = '';
            this.refs.email.input.value = '';  
        }
    
    }

    onClickInsert = (e) => {
        e.preventDefault();
        this.refs.insert.style.display = 'block';
    }

    showWetherUpdata(){
        confirm({
            title: '确定要修改吗?',
            content: '是的,我就是要修改！',
            onOk:()=> {
             
                    console.log(this);
                    this.handleUpdate();   
               
            },
            onCancel() {
               console.log('Cancel');
            },
        })
    }

    showWetherInsert(){
        confirm({
            title: '确定要插入数据吗?',
            content: '是的,就这么决定了！',
            onOk:()=> {
             
                    console.log(this);
                    this.handleInsert();   
               
            },
            onCancel() {
               console.log('Cancel');
            },
        })
    }


    handleDelete(keys = this.state.selectedRowKeys){
        if(this.state.selectedRowKeys.length>1){
            this.delAll();
        }else{
            axios.post(http.url+'/deluserlist',{
                id:keys
            }).then(function(res){
                Modal.confirm({
                    title: '修改成功',
                    content: "数据已经更新",
                    // 这里注意要用箭头函数, 否则this不生效
                    onOk: () => {
                        Modal.confirm({
                            title: '修改成功',
                            content: "数据已经更新",
                            // 这里注意要用箭头函数, 否则this不生效
                            onOk: () => {
                                this.getData();
                            },
                        });

                    },
                });
            }.bind(this))
        }

    }

    delAll(){
        const self = this.state,
            length = self.selectedRowKeys.length;
        let str = '';
        self.del_list = self.del_list.concat(self.selectedRowKeys);
        console.log(self.del_list[0]);
        for (let i = 0; i < length; i++) {
            axios.post(http.url+'/deluserlist',{id:self.selectedRowKeys[i]}).then((res)=> {
                Modal.confirm({
                    title: '修改成功',
                    content: "数据已经更新",
                    // 这里注意要用箭头函数, 否则this不生效
                    onOk: () => {
                        this.getData();
                    },
                });
            })
        }
        self.selectedRowKeys = [];
    }

    handleUpdate = function(){
       console.log(this.state.selectedRows[0]);
       let keys = this.state.selectedRows[0];
       if(this.state.selectedRowKeys.length>0){
            let id = keys.id;
            let username = this.refs.username.input.value;
            let telephone = this.refs.telephone.input.value;
            let email = this.refs.email.input.value;
            console.log(keys.id);
            axios.post(http.url+'/updatauserlist',{
                 id:id, username:username, telephone:telephone, email:email
            }).then(function(res,err){
                Modal.confirm({
                    title: '修改成功',
                    content: "数据已经更新",
                    // 这里注意要用箭头函数, 否则this不生效
                    onOk: () => {
                        this.getData();
                    },
                });
            }.bind(this))
       }else{
            Modal.confirm({
                title: '更新失败',
                content: "你未选择需要更新的行",
                // 这里注意要用箭头函数, 否则this不生效
                onOk: () => {
                    
                },
            });

       }

    }

    handleInsert(){
        let username = this.refs.addusername.input.value;
        let telephone = this.refs.addtelephone.input.value;
        let email = this.refs.addemail.input.value;
        let password = this.refs.password.input.value;
        axios.post(http.url+'/insertuserlist',{
            username:username, telephone:telephone, email:email, password:password
       }).then(function(res){
            Modal.confirm({
                title: '插入成功',
                content: "数据已经更新",
                // 这里注意要用箭头函数, 否则this不生效
                onOk: () => {
                    this.getData();
                },
            });
       }.bind(this))
    }
    
    closeForm(){
        this.refs.updata.style.display = 'none';
        this.refs.insert.style.display = 'none';
    }
    render() {
        const { loading, selectedRowKeys,selectedRows,formLayout,visible, confirmLoading, ModalText,ModalTitle,} = this.state;
        const rowSelection = {
            selectedRowKeys,
            selectedRows,
            onChange: this.onSelectChange,

        };

        const hasSelected = selectedRowKeys.length > 0;
            
        return (
            <div className="gutter-example">

                <BreadcrumbCustom first="表格" second="用户管理" />


                <Affix offsetTop={120} style={{ position: 'absolute', zIndex: 4, left: 900}} onChange={affixed => console.log(affixed)}>
                    <Button type="primary" icon="edit" onClick={this.onClickUpdate.bind(this)}>
                        修改
                    </Button>
                    <Button icon="delete" onClick={this.onClickDelete}>
                        删除
                    </Button>
                    <Button type="primary" icon="plus-circle-o" onClick={this.onClickInsert}>
                        增加
                    </Button>
                </Affix>

                <form ref="updata" className="updata">
                    <label>用户名</label>
                    <Input ref="username" placeholder="input placeholder" />

                    <label>手机号</label>
                    <Input ref="telephone" placeholder="input placeholder" />

                    <label>邮箱</label>                   
                    <Input ref="email" placeholder="input placeholder" />
            
                    <Button type="primary" onClick={this.showWetherUpdata.bind(this)}>修改</Button>
                    <Button type="primary" onClick={this.closeForm.bind(this)}>关闭</Button>
                </form>
                
                <form ref="insert" className="insert">
                    
                    <label>用户名</label>
                    <Input ref="addusername" placeholder="input placeholder" />
                    
                    <label>密码</label>
                    <Input ref="password" placeholder="input placeholder" />

                    <label>手机号</label>
                    <Input ref="addtelephone" placeholder="input placeholder" />
                    
                    <label>邮箱</label>
                    <Input ref="addemail" placeholder="input placeholder" />
                    
                    <Button type="primary" onClick={this.showWetherInsert.bind(this)}>插入</Button>
                    <Button type="primary" onClick={this.closeForm.bind(this)}>关闭</Button>
                </form>


                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="你的信息全都被我掌握！" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start}
                                            disabled={loading} loading={loading}
                                    >Reload</Button>
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UserlistTable;

