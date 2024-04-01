const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require("../../mysql/index");

router.get("/", function (req, res, next) {
    res.sendFile(path.join(__dirname, '../../public/login.html'));
});

require('dotenv').config({
    path : ".env",
})
const { verifyToken } = require("../middlewares");

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/singin', async (req, res) => {


    const userid = req.body.param.userid;
    const password = req.body.param.password;
    const keeplogin = req.body.param.keepLogin;

    // 데이터베이스에서 사용자 검색
    try {
        const userResult = await mysql.query("userLogin", [userid]);
        const user = userResult[0];

        if (!user) {
            return res.status(401).json({ success: false, message: '인증 실패: 사용자를 찾을 수 없습니다.' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ success: false, message: '인증 실패: 비밀번호가 틀렸습니다.' });
        }

        // 토큰 생성
        const token = jwt.sign(
            {
                id: user.userid,
                name: user.name,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d', // 하루 동안 유효한 토큰
                issuer: '토큰 발급자',
            }
        );

        if (keeplogin) {
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000, // 예: 1일
                sameSite: 'strict'
            });
        } else {
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
                // maxAge 설정 없음
            });
        }


        // 토큰과 함께 응답 반환
        res.json({
            success: true,
            message: '로그인 성공',

        });
    } catch (error) {
        console.error('로그인 처리 중 오류 발생:', error);
        return res.status(500).json({ success: false, message: '서버 오류 발생' });
    }
});


module.exports = router;