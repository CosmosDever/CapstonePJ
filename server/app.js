const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const PORT = 3000;

// ใช้ body-parser เพื่อรับข้อมูลจากแบบฟอร์ม
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// เส้นทางเพื่อรับข้อมูลจากแบบฟอร์ม
app.post('/set-parameters', function(req, res) {
     const time_period_ATR = req.body.time_period_ATR;
     const time_period_ADX = req.body.time_period_ADX;
     const time_period_RSI = req.body.time_period_RSI;
     const time_period_SMA = req.body.time_period_SMA;
 
     console.log(`time_period_ATR: ${time_period_ATR}`);
     console.log(`time_period_ADX: ${time_period_ADX}`);
     console.log(`time_period_RSI: ${time_period_RSI}`);
     console.log(`time_period_SMA: ${time_period_SMA}`);
 
     // ส่งข้อมูลไปยัง Flask API
     request.post(
         'http://127.0.0.1:9090/api/set-parameters',
         {
             json: {
                 time_period_ATR,
                 time_period_ADX,
                 time_period_RSI,
                 time_period_SMA
             }
         },
         (error, response, body) => {
             if (error) {
                 console.error('Error:', error);
                 res.status(500).send('Error setting parameters');
             } else {
                 console.log('Response from Flask:', body);
                 res.send('Parameters set successfully!');
             }
         }
     );
 });

// เส้นทางเดิมที่มีอยู่ในโค้ดของคุณ
app.get('/home', function(req, res) {
    request('http://127.0.0.1:9090/api/recommendation', function (error, response, body) {
        console.error('error:', error); // แสดงข้อผิดพลาด
        console.log('statusCode:', response && response.statusCode); // แสดงรหัสสถานะของการตอบกลับ
        console.log('body:', body); // แสดงข้อมูลที่ได้รับ
        res.send(body); // แสดงข้อมูลที่ได้รับบนเว็บไซต์
    });
});

// เริ่มการทำงานของแอปที่พอร์ต 3000
app.listen(PORT, function() {
    console.log(`Listening on Port ${PORT}`);
});
