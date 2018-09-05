const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const Info = model.getModel('homeinfo')
//const _filter = {'pwd':0,'__v':0}

Router.get('/list', function (req, res) {

 
    Info.find({}, function (err, doc) {
        return res.json({ code: 0, data: doc })
    })
})

Router.post('/createInfo', function (req, res) {
    console.log(req.body)
    const {  company, sal, des, shortdes } = req.body
    const InfoModel = new Info({   company, sal, des, shortdes })
    console.log(1)
        InfoModel.save(function (e, d) {
            console.log(2)
            if (e) {
                console.log(3)
                return res.json({ code: 1, msg: '后端出错了' })
            }
            return res.json({code:0,data:{company, sal, des, shortdes}})
        }) 
    
})
//这块还是要export的！
module.exports = Router