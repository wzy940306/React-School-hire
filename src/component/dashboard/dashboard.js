import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import ContactBox from '../../component/contact/contact'
import userCentre from '../../component/userCentre/userCentre'
import HomeInfo from '../../component/Homepage/home'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import Msg from '../../component/msg/msg'

@connect(
	state => state,{getMsgList,recvMsg}
)
class Dashboard extends React.Component {
	componentDidMount() {

            this.props.getMsgList();
         
       
		
    }
	render() {
		const { pathname } = this.props.location
		const user = this.props.user
		const navList = [

			{
				path: '/home',
				text: '首页',
				icon: 'boss',
				title: '首页',
				component: HomeInfo

			},
			{
				path: '/contact',
				text: '讨论',
				icon: 'boss',
				title: '交流讨论',
				component: ContactBox,
				
			},
		
			{
				path: '/msg',
				text: '消息',
				icon: 'msg',
				title: '消息列表',
				component: Msg
			},
			{
				path: '/me',
				text: '我',
				icon: 'user',
				title: '个人中心',
				component: userCentre
			}
		]

		const type = typeof navList.find(v => v.path === pathname)
		return (
			<div>
				<NavBar className='fixd-header' mode='dard'>{type === 'object' ? navList.find(v => v.path === pathname).title : "首页"}</NavBar>		
				
				<div className='fixd-body' style={{  }} >
					<Switch>
						{navList.map(v => (
							<Route key={v.path} path={v.path} component={v.component}></Route>
						))}
						
					</Switch>
				</div>

				<NavLinkBar className='fixd-footer' data={navList}></NavLinkBar>

			</div>
		)


	}

}

export default Dashboard