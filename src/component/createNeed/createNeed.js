import React from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router'
import { Slider, WingBlank, WhiteSpace ,NavBar, Icon, List, InputItem, Switch, Stepper, Range, Button } from 'antd-mobile';
import { createForm } from 'rc-form';


import {creEngage} from '../../redux/home.redux'
const Item = List.Item;

@withRouter
@connect(
	state=>state.HomeAction,
	{creEngage}
)

 class CreateNeed extends React.Component {

    
 constructor()
 {
     super()
      this.state = {
        des:'',
        shortdes:'',
        sal:0 ,
        company:'www'
      }
    
 }
   
      log = (name) => {
        return (value) => {
          console.log(`${name}: ${value}`);
          console.log(Slider.onAfterChange);
        };
      }
      handleChange(key,val){
		this.setState({
			[key]:val
		})
	}
      onSubmit = () => {
        this.props.form.validateFields({ force: true }, (error) => {
          if (!error) {
              console.log(this.state)
            this.props.creEngage(this.state);
            alert('任务创建成功');
            this.props.history.push('/home')
          } else {
            alert('有信息没有填写完整');
          }
        });
      }
      onReset = () => {
        this.props.form.resetFields();
      }
      valueChandeDis = () =>{

      }
      
      validateAccount = (rule, value, callback) => {
        if (value && value.length > 15) {
          callback();
        } else {
          callback(new Error('请填写招聘细则，至少15个字以上'));
        }
      }
    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.goBack()} >创建求职任务 </NavBar>
    <form>
      <List
        renderHeader={() => '填写任务详情'}
     //   renderFooter={() => getFieldError('account') && getFieldError('account').join(',')}
      >
        <InputItem

     onChange = {v=>this.handleChange('shortdes',v)}

          


          clear
          error={!!getFieldError('account')}
          onErrorClick={() => {
            alert(getFieldError('account').join('、'));
          }}
     
          placeholder="至少15字以上。。"
        >招聘细则</InputItem>
        <InputItem 
             onChange = {v=>this.handleChange('des',v)}
            {...getFieldProps('职位需求')}
         placeholder=""
        //
        >
        职位需求
        </InputItem>
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <p className="sub-title">给予薪资 :{this.state.sal}k </p>
          <Slider
       
            style={{ marginLeft: 30, marginRight: 30 }}
            defaultValue={0}
            min={0}
            max={30}
            onChange={this.log('change')}
            onAfterChange={v=>this.handleChange('sal',v)}
          />
        </WingBlank>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <Item>
          <Button type="primary" size="small" inline onClick={this.onSubmit.bind(this)}>Submit</Button>
          <Button size="small" inline style={{ marginLeft: '2.5px' }} onClick={this.onReset}>Reset</Button>
        </Item>
      </List>
    </form>
            </div>

        )
    }

}

const BasicInputWrapper = createForm()(CreateNeed);

export default BasicInputWrapper;