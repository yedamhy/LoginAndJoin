/*
Credits  Andy Tran
https://codepen.io/andytran/pen/RPBdgM
*/
document.addEventListener('DOMContentLoaded', function() {
    // 로그인 버튼에 이벤트 리스너 추가
    document.getElementById('signInButton').addEventListener('click', function() {
        // 사용자 입력을 가져옵니다.
        const userid = document.querySelector('input[type="text"]').value;
        const password = document.querySelector('input[type="password"]').value;
        const keepLogin = document.getElementById('keepLogin').checked;

        // 입력값 검증
        if (!userid.trimEnd() || !password.trimEnd()) {
            alert('ID와 비밀번호를 입력해주세요.');
            return;
        }

        // 서버로 로그인 요청을 보냅니다.
        fetch('login/singin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "param" : {
                    "userid": userid,
                    "password": password,
                    "keepLogin" : keepLogin
                }
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })

            .then(data => {
                console.log("프론트에 넘어온 정보 다 확인 : ", data);
                if (data.success) {
                    // 로그인 성공 처리
                    if(!keepLogin){
                        // 여기서 특별히 할 거 X
                    } else {
                        localStorage.setItem('token', data.token); // 로그인 유지를 선택한 경우
                    }
                    // 로그인 후의 리디렉션 또는 성공 메시지를 여기에 추가합니다.
                    window.location.href = '/'; // 대시보드 또는 메인 페이지로 리디렉션
                } else {
                    // 로그인 실패 처리
                    console.error('Login failed:', data.message);
                    alert(data.message); // 서버로부터 받은 에러 메시지를 표시합니다.
                }
            })

            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                alert('로그인 중 문제가 발생했습니다.');
            });
    });
});
