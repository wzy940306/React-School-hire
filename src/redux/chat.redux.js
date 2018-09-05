import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
    users: {},
    chatmsg: [],
    unread: 0
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            const id = action.payload.id
            const chatmsg1 = action.payload.msgs.filter(v => v.to === id)
            console.log(chatmsg1)
            return { ...state, chatmsg: chatmsg1, unread: chatmsg1.filter(v => !v.read).length, users: action.payload.users }
        case MSG_RECV:

            return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + 1 }
        case MSG_READ:
        const id = action.payload.id
        const chatmsg = action.payload.msgs.filter(v => v.to === id)
            return {...state,chatmsg: [chatmsg.map(v=>({...v,read:true}))], unread:state.unread-action.payload.num}
        default:
            return state
    }

}
export function msgList(msgs, users, id) {
    return {
        type: MSG_LIST,
        payload: { msgs: msgs, users: users, id: id }
    }
}
export function sendMsg({ from, to, msg }) {
    return dispatch => {
        socket.emit("sendMsg", { from, to, msg })

    }
}
export function recvMsg() {
    return dispatch => {
        socket.on("recvMsg", function (data) {
            console.log("recvMsg")
            dispatch(msgRecv(data))
        })

    }
}
function msgread({ from, userid, num }) {
    return {
        type: MSG_READ,
        payload: { from, userid, num }
    }
}
export function readmsg(from) {
    return (dispatch, getState) => {
        axios.post('/user/readmsg', { from }).then(res => {
            //后端，前端，一起链条
            const userid = getState().user._id
            if (res.status === 200 && res.data.code === 0) {
                dispatch(msgread({num:res.data.num,from,userid}))
            }

        })
    }
}
export function getMsgList() {

    return (dispatch, getState) => {
        axios.get('/user/chatMsgList').then(
            res => {
                console.log(getState())
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(msgList(res.data.msgs, res.data.users, getState().user._id))
                }
            }
        )
    }
}
function msgRecv(data) {
    return {
        type: MSG_RECV,
        payload: data
    }
}
var xhr = new XMLHttpRequest;
xhr.open('GET','https://blog.csdn.net/ourpush/article/details/53706497',false)
xhr.onreadystatechange=function(){
    if(xhr.readyState==4){
        if(xhr.status==200)
        alert(xhr.responseText)
    }
}