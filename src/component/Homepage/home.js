import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { getEngageList } from '../../redux/home.redux'

@connect(
	state => state.HomeAction, { getEngageList }
)
class InfoCard extends React.Component {
	componentDidMount() {
		console.log(1)
		if (this.props.engageList == null)
			console.log(2)
		this.props.getEngageList();
	}
	render() {
		const Header = Card.Header
		const Body = Card.Body
		return (
			<div >
				<WingBlank>
					<WhiteSpace></WhiteSpace>
					{this.props.engageList.map(v => ((<Card key={v._id}>
						<Header
							title={v.shortdes}


						></Header>
						<Body>
							{v.type === 'boss' ? <div>公司:{v.company}</div> : null}

							{v.des}
							<div>薪资:{v.sal}k</div>
						</Body>

						<WhiteSpace></WhiteSpace>
					</Card>
					)

					))}
				</WingBlank>
				
			</div>
		)


	}
}
export default InfoCard

