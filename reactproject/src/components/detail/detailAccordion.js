import { Accordion, List } from 'antd-mobile';
import React from 'react';

class DetailAccordion extends React.Component {
  onChange = (key) => {
    console.log(key);
  }
  render() {
    return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
	        <Accordion.Panel header="商品描述">
	        </Accordion.Panel>
	        <Accordion.Panel header="尺码" className="pad">this is panel content2 or other</Accordion.Panel>
	        <Accordion.Panel header="成分与护理" className="pad">
	        </Accordion.Panel>
	        <Accordion.Panel header="购物须知及无理由免费退货" className="pad">
	        </Accordion.Panel>
	        <Accordion.Panel header="品牌故事" className="pad">
	        </Accordion.Panel>
        </Accordion>
      </div>
    );
  }
}

export default DetailAccordion