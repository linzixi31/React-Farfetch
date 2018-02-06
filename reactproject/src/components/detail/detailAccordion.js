import { Accordion, List } from 'antd-mobile';
import React from 'react';
import DetailShare from './detailShare';
class DetailAccordion extends React.Component {
  onChange = (key) => {
   	
  }
  render() {
    return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
	        <Accordion.Panel header="商品描述">
	          <p>{this.props.descriptions}</p>
	          <p>品牌特定编号:<span>{this.props.sku}</span></p>
	          <div className="share">
	          	<DetailShare/>
	          </div>
	        </Accordion.Panel>
	        <Accordion.Panel header="购物须知及无理由免费退货" className="pad">
	        	<p id="mainCountry">商品来自意大利</p>
	        	<div id="mainfree">
	        		<p>
		        		14天无理由免费退货(退款含税)
		        	</p>
		        	<p>
		        		我们提供全球免费退货服务.自您签收之日起,您有14天事件无理由退回商品,
		        		我们建议在收到商品的7天内,在您的Farfetch账户里预约免费的"上面提取退货"服务,
		        		以确保退货按时抵达原合作伙伴方.来自中国内地的退货,您的退款将包含下单时所支付的关税,
		        		一扫海外购物的疑虑
		        	</p>
	        	</div>
	        	
	        </Accordion.Panel>
	        <Accordion.Panel header="品牌故事" className="pad">
	        	<p id="mainBrand">{this.props.brand}</p>
	        	<p>
	        		意大利知名奢侈品Prada,最初于1913年以高级皮革制品起家.创办人MarioPrada的孙女MiucciaPrada,在80年代期间接班家族事业并担任创意总监,这时她大举开拓时尚新品设计,更凭
	        		经典黑色尼龙手提包风靡全球,跃升成为世界顶级品牌.迈入了90年代,Prada更退出令时尚爱好者爱不释手的女装设计.时至今日,Prada陆续发展了男装及副牌Miu Miu等系列,利落线条和摩登
	        		剪裁让品牌持续以精致新潮设计著称.
	        	</p>
	        </Accordion.Panel>
        </Accordion>
      </div>
    );
  }
}

export default DetailAccordion