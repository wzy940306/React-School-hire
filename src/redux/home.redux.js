
import axios from 'axios'
//import {getRedirectPath} from '../util'
const HOMEINFO = "HOMEINFO";
const createInfo = "createInfo";
const initState = {
	engageList: []
}


export function HomeAction(state = initState, action) {
	switch (action.type) {
		case HOMEINFO:
			return { ...state, engageList: action.payload }
		case createInfo:
			return { ...state, engageList: [...state.engageList,action.payload] }
		default:
			return state 
	}
}
function EngageList(data) {
	return {
		type: HOMEINFO, 
		payload: data,
	}
}
function createEngageInfo(data) {
	return {
		type: createInfo,
		payload: data,
	}
}
//前面叽里呱啦判断，这个才是真正获取数据的
export function getEngageList() {
	return dispatch => {
		axios.get('/display/list')
			.then(res => {
				console.log(1)
				if (res.data.code == 0) {
					console.log(res)
					console.log(res.data)
					dispatch(EngageList(res.data.data))
				}
			})

	}
}

export function creEngage({ sal, des, shortdes, company }) {
	console.log(1)
	return dispatch => {
		axios.post('/display/createInfo',{  company, sal, des, shortdes})
		.then(res => {
			console.log(res.data.code)
				if (res.data.code == 0) {
					console.log(res)
					console.log(res.data.data)
					dispatch(createEngageInfo(res.data.data))
				}
			})

	}
}
