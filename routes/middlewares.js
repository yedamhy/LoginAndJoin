const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  // 인증 완료
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

    return next();
  } catch (error) {
    // 인증 실패
    if (error.name === "TokenExpireError") {
      // 에러를 다음 미들웨어로 전달
      return next(error);
    }
}};

