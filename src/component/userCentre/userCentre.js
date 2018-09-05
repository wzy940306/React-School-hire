import React from 'react'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import { connect } from 'react-redux';
import browserCookie from 'browser-cookies'
import { userlogOut } from '../../redux/user.redux'
import { Link } from 'react-router-dom';

@connect(
    state => state.user, { userlogOut }
)
export default class UserCentre extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)

    }
    logout() {
        const alert = Modal.alert;
        console.log(this.props)
        alert('注销', 'Are you sure???', [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            {
                text: 'Ok', onPress: () => {
                    console.log('ok');
                    browserCookie.erase('userid');
                    console.log('ok');
                    this.props.userlogOut();
                    //     this.props.history.push('/home')
                }
            },
        ])
    }


    render() {
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        console.log(props)
        console.log(props.isAuth)
        return props.isAuth ?
            (
                <div>
                    <Result
                        img={<img style={{ width: 50 }} src={require(`../img/${this.props.avatar}.png`)} alt='' />}
                        title={this.props.user}
                        message={props.type === 'boss' ? props.com : null}

                    >
                    </Result>
                    <List renderHeader={() => '个人简介'}>
                        <List.Item >
                            {props.title}
                            {props.desc.split('\n').map(v => (
                                <Brief key={v}>{v}</Brief>
                            ))}
                            {props.sal ? <Brief >{props.sal}</Brief> : null}
                        </List.Item>
                    </List>



                    <WhiteSpace />
                    <List >
                        <List.Item >
                            我的收藏
                        </List.Item>
                        <Link to='/createNeed'>
                            <List.Item  >
                                创建求职
                        </List.Item>
                        </Link>
                    </List>

                    <WhiteSpace />
                    <List>
                        <List.Item onClick={this.logout}>退出登录</List.Item>


                    </List>
                </div>
            ) :
            (
                <div>
                    <WhiteSpace />
                    <Link to='/login'>  <h4  >  你还没有登录，请登录后在bb    </h4> </Link>

                    <WhiteSpace />
                </div>)
    }
}
