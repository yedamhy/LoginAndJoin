# LoginAndJoin
회원가입 및 로그인 구현하기 **with Node.js**

## 🖥️ 화면
![image](https://github.com/yedamhy/LoginAndJoin/assets/87516405/c989dcc3-5c86-4a94-bde8-b1fe55ba7946)
![image](https://github.com/yedamhy/LoginAndJoin/assets/87516405/003aec22-80f5-4585-be3b-e374675bc420)

## 상세 구현 사항
### 로그인 (경로 : /login)
- 최상단에 개발자의 학번과 이름을 표기
- **ID, PW** 입력 form, **제출 button**, **로그인 유지 checkbox**
- **로그인 유지** 활성화 시, 브라우저를 닫고 열어도 **로그인이 유지**되어야 함. 비활성화 시에는 **브라우저 종료** 시 **로그아웃**이 되어야 함.
  
### 회원가입 (경로 : /join)
- **ID**, **비밀번호1** (PW1), **비밀번호2** (PW2) 에 대한 입력 form, **ID에 대한 중복 확인** button, **제출 Button**
- PW1과 PW2 의 일치 여부 및 비밀번호의 조건을 판단하고, 키 입력 시 바로 PW2의 하단에 표기한다.
  - 조건은 **영어와 숫자의 조합**으로 **4글자 이상**
  - ID 에 대한 중복확인을 하지 않으면, **제출 button 을 클릭할 수 없음**

### 홈 (경로 : /)
- 적절한 **JWT가 없다면** **로그인으로 강제 이동**
- 적절한 **JWT가 있다면** “환영합니다 고객님” **환영 메시지**를 노출

<hr>

### 데이터베이스
**MYSQL** 이용, 회원가입 시 **비밀번호**는 **암호화** 되어 **DB에 저장**

![image](https://github.com/yedamhy/LoginAndJoin/assets/87516405/761bc2d1-1a59-434e-9329-4e608671da51)
