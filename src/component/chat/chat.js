import React from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { NavBar, Icon, List, InputItem } from 'antd-mobile'
import { getMsgList, sendMsg, recvMsg,readmsg } from '../../redux/chat.redux'
import { getchatId }  from '../../util'
const socket = io('ws://localhost:9093')

@connect(state => state, { getMsgList, sendMsg, recvMsg,readmsg })
class Chat extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: []
        }
    }
    componentDidMount() {
        
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
    
    }
    componentWillUnmount(){
            const to = this.props.match.params.user
        this.props.readmsg(to)
    }
    onsendMsg() {
        const from = this.props.user._id;
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({ from, to, msg });
        this.setState({ text: '' })
    }
    render() {
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        const chatid = getchatId(this.props.user._id,userid)
        const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
        console.log(chatmsg)
        console.log(chatid)
        if (!users[userid])
            return null
        return (
            <div id='chat-box'>

                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}

                >{users[userid].name}</NavBar>
                {chatmsg.map(v => {

                    const avaer = require(`../img/${users[v.from].avatar}.png`)
                    return v.from === userid ? (
                        <List key={v._id}>
                            <Item
                                thumb={avaer}
                            >
                                {'对方发来了的' + v.content}
                            </Item>
                        </List>)
                        : (<List key={v._id} >
                            <Item className='chat-me'
                                extra={<img src={avaer} alt="" />}

                            >
                                {'我发来了的' + v.content}
                            </Item>
                        </List>)
                }
                )
                }
                <List className='msgSend-box'>
                    <InputItem
                        value={this.state.text}
                        placeholder={'请输入信息。。。'}
                        onChange={(v) => {
                            this.setState({ text: v })

                        }}
                        extra={<span onClick={() => this.onsendMsg()}> 发送</span>}
                    >
                        输入
                    </InputItem>
                </List>
            </div >
        )
    }
}


export default Chat;