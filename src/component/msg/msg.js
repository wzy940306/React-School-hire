import React from 'react'
import { connect } from 'react-redux'
import { Badge, List , WhiteSpace } from 'antd-mobile'
import { Link } from 'react-router-dom';


@connect(state => state)
export default class Msg extends React.Component {
 getLast(Arr){
    return Arr[Arr.length-1]
}
    render() {
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        //console.log(msgGroup)
        const Item = List.Item
        const Brief = Item.Brief
        const chatmsg = Object.values(msgGroup).sort(
            (a,b)=>{
                const a_list = this.getLast(a)
                const b_list = this.getLast(b)
                return b_list.create_time - a_list.create_time
            }
        )
        const userid = this.props.user._id
        const userinfo = this.props.chat.users
        return this.props.user.isAuth?  (
            <div>
                <List >
                    {
                        chatmsg.map(v => {
                            const value = this.getLast(v)
                            const dis = v[0].from===userid?v[0].to:v[0].from
                            const name = userinfo[dis]?userinfo[dis].name:''
                            const avatar = userinfo[dis]?userinfo[dis].avatar:''
                            const unreadmsg = v.filter(v=>!v.read&&v.to===userid).length
                   console.log(avatar)
                            return(
                                <List key={value._id} >
                            <Item 
                            thumb={require(`../img/${avatar}.png`)}
                            extra={<Badge text={unreadmsg}></Badge>}
                            arrow="horizontal"
                            onClick={
                                ()=>{
                                    this.props.history.push(`/chat/${dis}`)
                                }
                            }
                            >
                                 {value.content}
                                <Brief>
                               { name}
                                </Brief>
                            </Item>
                            </List>
                            )
                        })
                    }
                </List>
            </div>
        ):(<div>
            <WhiteSpace />
            <Link to='/login'>  <h4  >  你还没有登录，请点击登录    </h4> </Link>

            <WhiteSpace />
        </div>)
    }
}
