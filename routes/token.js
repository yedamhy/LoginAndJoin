const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

require("dotenv").config();

const { verifyToken } = require("./middlewares");

router.post("/", async (req, res) => {
  try {
    const { user } = req.body; // api/login.js에서 전달된 사용자 정보
    // jwt.sign() 메소드: 토큰 발급
    const token = jwt.sign(
      {
        id: user.id,   // 사용자의 ID
        nick: user.name, // 사용자의 이름
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1m",
        issuer: "토큰 발급자",
      }
    );

    // 토큰 발급해서 보내주는 것.
    return res.json({
      code: 200,
      message: "토큰이 발급되었습니다.",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
});

// 검증 -> 검증이 잘 되면 request 값을 decode 한다.
// token/test 하면 이게 실행된다.
router.get("/test", verifyToken, (req, res) => {
  res.json(req.decoded);
});

module.exports = router;
