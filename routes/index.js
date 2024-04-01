const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const path = require('path');

const { verifyToken } = require('./middlewares');

/* GET home page. */
router.get("/", function (req, res, next) {
  try {
    const token = req.cookies.token; // 쿠키에서 토큰 가져오기
    if (token) {

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.render('index', { username: decoded.name }); // 토큰이 유효하면 사용자 이름으로 환영 메시지 출력

    } else {
      // 자동으로 '/login' 으로 넘어가게 설정
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.render('index', { username: null }); // 에러가 발생한 경우에도 사용자 이름 없이 페이지 렌더링
  }
});

module.exports = router;

