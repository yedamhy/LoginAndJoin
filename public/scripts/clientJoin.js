/*
Credits  Andy Tran
https://codepen.io/andytran/pen/RPBdgM
*/

document.addEventListener('DOMContentLoaded', function (elementId) {

    // 사용자 입력 값 & 나타낼 메세지
    const useridInput = document.getElementById("userid");
    const useridMessage = document.getElementById("useridMessage");

    const userName = document.getElementById("name");

    const userPwInput = document.getElementById("password");
    const userpwMessage = document.getElementById("userpwMessage");

    const userPwConfirmInput = document.getElementById("confirmPassword");
    const userpw2Message = document.getElementById("userpw2Message");


    // 아이디 형식 확인
    useridInput.addEventListener("keyup", function() {
        const userid = useridInput.value.trimEnd();
        if (userid.length >= 4 && /^[a-z0-9]+$/.test(userid)) {
            useridMessage.textContent = "사용할 수 있어요. ID 중복확인을 해주세요";
        } else {
            useridMessage.textContent = "영어 소문자 또는 숫자로 4글자 이상 입력해주세요";
        }
    });


    // 아이디 중복 확인
    function checkUserId() {

        const userid = useridInput.value.trimEnd();

        fetch('join/check-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                "param" : {
                    "userid": userid
                    // 여기에 필요한 다른 데이터를 추가할 수 있습니다.
                }
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Parsed JSON:", data);
            if (data.isUsernameAvailable) {
                alert('사용이 가능합니다');
                document.getElementById("name").disabled = false;
                document.getElementById("password").disabled = false;
                document.getElementById("confirmPassword").disabled = false;

                useridMessage.textContent = " ";

            } else {
                alert('이미 존재하는 ID입니다.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('오류가 발생했습니다.');
        });
    }

    // 비밀번호 조건 확인
    userPwInput.addEventListener("keyup", function() {
        const userpw = userPwInput.value.trimEnd();
        if (userpw.length >= 4 && /[a-zA-Z]/.test(userpw) && /[0-9]/.test(userpw)) {
            userpwMessage.textContent = "사용할 수 있어요. ";
        } else {
            userpwMessage.textContent = "영어 & 숫자 조합으로 4글자 이상 입력해주세요";
        }
    });

    // 입력한 두 비밀번호 같게 처리
    userPwConfirmInput.addEventListener("keyup", function() {
        const userpw = userPwInput.value.trimEnd();
        const userpw2 = userPwConfirmInput.value.trimEnd();
        if ( userpw === userpw2) {
            userpw2Message.textContent = "비밀번호가 일치해요";
        } else {
            userpw2Message.textContent = "비밀번호를 일치 시켜주세요.";
        }
    });

    // 비밀번호 조건 처리 함수
    function isPasswordValid(userpw) {
        return userpw.length >= 4 && /[a-zA-Z]/.test(userpw) && /[0-9]/.test(userpw);
    }

    // 회원가입 버튼 활성화 & 회원가입 요청
    function updateSignUpButtonState() {
        const userid = useridInput.value;
        const userpw = userPwInput.value;
        const userpw2 = userPwConfirmInput.value;
        const isUserIdValid = userid.length >= 4 && /^[a-z0-9]+$/.test(userid);
        const isUserPwValid = isPasswordValid(userpw);
        const isPasswordMatch = userpw === userpw2;

        // 'Sign Up' 버튼의 disabled 상태 업데이트
        document.getElementById("signUpButton").disabled = !(isUserIdValid && isUserPwValid && isPasswordMatch);
    }

    // 각 입력 필드에 대한 이벤트 리스너 내에서 updateSignUpButtonState 호출
    useridInput.addEventListener("keyup", updateSignUpButtonState);
    userPwInput.addEventListener("keyup", updateSignUpButtonState);
    userPwConfirmInput.addEventListener("keyup", updateSignUpButtonState);

    document.getElementById('checkUsernameButton').addEventListener('click', checkUserId);

    // singup 버튼 눌렀을 때 회원가입 처리
    document.getElementById("signUpButton").addEventListener("click", function() {
        const userid = useridInput.value.trimEnd();
        const username = userName.value.trimEnd();
        const userpw = userPwInput.value.trimEnd();

        fetch('join/signup', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "param" : {
                    "userid": userid,
                    "name": username,
                    "password": userpw
                }
            }),

        })

        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Signup Success:", data);
            // 회원가입 성공 메시지 표시
            alert('회원가입에 성공했습니다');
            // 로그인 페이지로 리디렉션
            window.location.href = '/login';
        })
        .catch(error => {
            console.error('Signup Error:', error);
            // 회원가입 실패 시 처리
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        });

    });

});
