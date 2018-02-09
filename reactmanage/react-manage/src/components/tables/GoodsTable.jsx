import React from 'react';
import { Table, Input, Button, Icon, Row, Col , Card, Modal, Affix } from 'antd';
import { getPros } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';
import axios from 'axios';
import http from '../../http/baseurl';
import '../../style/goodstable.less'
const columns = [
{
    title:'ID',
    dataIndex:'id',
    key:'id'
}
,{
    title: '商品名',
    dataIndex: 'title',
    key:'title',
    width: 100,
    render: (text, record) => <a href={record.url} target="_blank">{text}</a>,
}, {
    title: '品牌',
    dataIndex: 'brand',
    width: 80
}, {
    title: '当前价',
    dataIndex: 'currentPrice',
    width: 80
}, {
    title: '热门',
    dataIndex: 'hot',
    width: 200
}];

const confirm = Modal.confirm.bind(this);

class GoodsTable extends React.Component {
    state = {
        selectedRowKeys: [],  // Check here to configure the default column
        selectedRows:'',
        loading: false,
        data: [],
        columns,
        visible: false,
        del_list:[],
        filterDropdownVisible: false,
        searchText: '',
        filtered: false,
    };
    componentDidMount() {
        this.start();
    }

    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    }

    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
         console.log(reg);
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,

            data: this.state.data.map((record) => {
                const match = record.title.match(reg);
                if (!match) {
                    return null;
                    console.log(66)
                }
                return {
                    ...record,
                    name: (
                        <span>
                            {record.title.split(reg).map((text, i) => (
                                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                            ))}
                        </span>
                    ),
                };
            }).filter(record => !!record),
        });

    };

    start = () => {
        this.setState({ loading: true });
        this.getData();
    };

    getData(){
        getPros().then(res => {
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

    handleFormLayoutChange = (e) => {
        this.setState({ formLayout: e.target.value });
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
        console.log(this.state.selectedRows)
        if(this.state.selectedRowKeys.length > 0 ){
           this.refs.title.input.value = this.state.selectedRows[0].title;
           this.refs.brand.input.value = this.state.selectedRows[0].brand;
           this.refs.currentPrice.input.value = this.state.selectedRows[0].currentPrice;
           this.refs.hot.input.value = this.state.selectedRows[0].hot; 
        }else{
            this.refs.title.input.value = '';
            this.refs.brand.input.value = '';
            this.refs.currentPrice.input.value = '';
            this.refs.hot.input.value = '';
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
            axios.post(http.url+'/goods/delete',{
                id:keys
            }).then(function(res){
                this.getData();
            }.bind(this)).catch(function(error){
                Modal.confirm({
                    title: '错误',
                    content: '删除错误，请检查网络连接',
                    // 这里注意要用箭头函数, 否则this不生效
                    onOk: () => {
                        
                    },
                });
            })
        }

    }

    delAll(){
        const self = this.state,
            length = self.selectedRowKeys.length;
            self.del_list = self.del_list.concat(self.selectedRowKeys);
        console.log(self.del_list[0]);
        for (let i = 0; i < length; i++) {
            axios.post(http.url+'/goods/delete',{id:self.selectedRowKeys[i]}).then((res)=> {
                this.getData();
            }).catch(function(error){
                Modal.confirm({
                    title: '错误',
                    content: '删除错误，请检查网络连接',
                    // 这里注意要用箭头函数, 否则this不生效
                    onOk: () => {
                        
                    },
                });
            })
        }
        self.selectedRowKeys = [];
    }

    handleUpdate = function(){
       console.log(this.state.selectedRows[0]);
       let keys = this.state.selectedRows[0];
       let id = keys.id;
       let title = this.refs.title.input.value;
       let brand = this.refs.brand.input.value;
       let currentPrice = this.refs.currentPrice.input.value;
       let hot = this.refs.hot.input.value;
       console.log(keys.id);
       axios.post(http.url+'/goods/updata',{
            id:id, title:title, brand:brand, currentPrice:currentPrice, hot:hot 
       }).then(function(res){
            this.getData();
            this.state.selectedRowKeys = '';
       }.bind(this)).catch(function(error){
            Modal.confirm({
                title: '错误',
                content: '删除错误，请检查网络连接',
                // 这里注意要用箭头函数, 否则this不生效
                onOk: () => {
                    
                },
            });
       })
    }

    handleInsert(){
        let title = this.refs.addtitle.input.value;
        let brand = this.refs.addbrand.input.value;
        let currentPrice = this.refs.addcurrentPrice.input.value;
        let hot = this.refs.addhot.input.value;
        axios.post(http.url+'/goods/Insert',{
            title:title, brand:brand, currentPrice:currentPrice, hot:hot 
       }).then(function(res){
            this.getData();
       }.bind(this))
    }
    
    closeForm(){
        this.refs.updata.style.display = 'none';
        this.refs.insert.style.display = 'none';
    }
    render() {
        const { loading, selectedRowKeys,selectedRows} = this.state;
        const rowSelection = {
            selectedRowKeys,
            selectedRows,
            onChange: this.onSelectChange,

        };

        const hasSelected = selectedRowKeys.length > 0;
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key:'id',
            }
            ,{
                title: '商品名',
                dataIndex: 'title',
                key:'title',
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input
                            ref={ele => this.searchInput = ele}
                            placeholder="Search name"
                            value={this.state.searchText}
                            onChange={this.onInputChange}
                            onPressEnter={this.onSearch}
                        />
                        <Button type="primary" onClick={this.onSearch}>Search</Button>
                    </div>
                ),
                filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
                filterDropdownVisible: this.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }, () => this.searchInput.focus()),
            }, {
                title: '品牌',
                dataIndex: 'brand',
                key:'brand',
            }, {
                title: '当前价',
                dataIndex: 'currentPrice',
                key:'currentPrice',
            },
            {
                title: '热门',
                dataIndex: 'hot',
                key:'hot',
            },
            ];    
        return (
            <div className="gutter-example">

                <BreadcrumbCustom first="表格" second="商品管理" />


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
                    


                    
                    <label>"商品名"</label>
                    
                    <Input ref="title" placeholder="input placeholder" />
                    
                    <label>"品牌"</label>
                    
                    <Input ref="brand" placeholder="input placeholder" />
                    
                    <label>"当前价"</label>
                    
                    <Input ref="currentPrice" placeholder="input placeholder" />
                
                    <label>"热门"</label>
                
                    <Input ref="hot" placeholder="input placeholder" />
                    

                    
                    <Button type="primary" onClick={this.showWetherUpdata.bind(this)}>修改</Button>
                    <Button type="primary" onClick={this.closeForm.bind(this)}>关闭</Button>
                </form>
                
                <form ref="insert" className="insert">
                    


                    
                    <label>"商品名"</label>
                    
                    <Input ref="addtitle" placeholder="input placeholder" />
                    
                    <label>"品牌"</label>
                    
                    <Input ref="addbrand" placeholder="input placeholder" />
                    
                    <label>"当前价"</label>
                    
                    <Input ref="addcurrentPrice" placeholder="input placeholder" />
                
                    <label>"热门"</label>
                
                    <Input ref="addhot" placeholder="input placeholder" />
                    

                    
                    <Button type="primary" onClick={this.showWetherInsert.bind(this)}>插入</Button>
                    <Button type="primary" onClick={this.closeForm.bind(this)}>关闭</Button>
                </form>


                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="王鹤和他的小姨子逃跑了,现在大甩卖,地摊货30一件,100元3件" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start}
                                            disabled={loading} loading={loading}
                                    >Reload</Button>
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                                </div>
                                <Table rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={this.state.data}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <style>{`
                    .custom-filter-dropdown {
                      padding: 8px;
                      border-radius: 6px;
                      background: #fff;
                      box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
                    }
                    .custom-filter-dropdown input {
                      width: 130px;
                      margin-right: 8px;
                    }
                    .highlight {
                      color: #f50;
                    }
                `}</style>
            </div>

        );
    }
}

export default GoodsTable;

