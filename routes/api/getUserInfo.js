const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysql = require("../../mysql/index");
const path = require('path');
const fs = require("fs");

// 토큰 검증 미들웨어

router.get('/', (req, res) => {
    try {
        const token = req.cookies.token; // 쿠키에서 토큰 가져오기
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ success: true, username: decoded.name });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or missing token' });
    }
});

module.exports = router;