import React from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import Boss from '../../component/boss/boss'
function renderTabBar(props) {
  return (<Sticky>
    {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
  </Sticky>);
}
const tabs = [
  { title: '兼职交流' },
  { title: '聊天吐槽' },
  { title: '互帮互助' },
];
class ContactBox extends React.Component {

    render(){ 
        return(
<div className = 'contactBox'>
  
    <StickyContainer>
      <Tabs tabs={tabs}
        initalPage={'t2'}
        renderTabBar={renderTabBar}
      >
        <div  className = 'contactBox1' >
         <Boss />
        </div>
        <div  className = 'contactBox1'>
          Content of second tab
        </div>
        <div  className = 'contactBox1' >
          Content of third tab
        </div>
      </Tabs>
    </StickyContainer>

  </div>

        )
    }
}


export default ContactBox;