const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const {User} = require("./models/User");

// application/X-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
// application/json
app.use(bodyParser.json());
// bodyParser: 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해주는 것

const config = require('./config/key');

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)

app.get('/', (req, res) => {res.send('just do it')})

app.post('/register', (req, res) => {
    // 회원가입 할때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => {console.log(`Example app listening on port ${port}`)})

