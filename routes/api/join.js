const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");
const mysql = require("../../mysql/index");

router.get("/", function (req, res, next) {
    res.sendFile(path.join(__dirname, '../../public/join.html'));
});

// 아이디 중복 확인 버튼 눌렀을 때
router.post('/check-username', async (req, res) => {
    const userid = req.body.param.userid;

    try {
        const result = await mysql.query("checkIdDupli", [userid]);

        if (result[0].count > 0) {
            res.json({isUsernameAvailable: false});
        } else {
            res.json({isUsernameAvailable: true});
        }
    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({message: 'Database error'});
    }
});

// 회원 가입 버튼 눌렀을 때
router.post('/signup', async (req, res) => {
    try {
        const { userid, name, password } = req.body.param;

        // 비밀번호 해싱
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 데이터베이스에 저장할 사용자 객체
        const user = {
            userid: userid,
            name: name,
            password: hashedPassword  // 해싱된 비밀번호
        };

        // 데이터베이스에 사용자 정보 저장
        const result = await mysql.query("userInsert", user);

        // 저장 성공 응답
        res.json({ success: true, message: 'User registered successfully', userid: userid });
    } catch (error) {
        // 오류 처리
        console.error('Signup Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }


});

module.exports = router;