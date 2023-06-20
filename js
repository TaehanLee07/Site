let currentQuestion = 0;
let score = 0;

const questions = [
    {
        question: "김규민의 몸무게를 구하시오.",
        choices: ["125", "130", "135", "512"],
        answer: "512"
    },
    {
        question: "규민이는 하루에 몇끼를 먹을까?",
        choices: ["3", "4", "5", "12"],
        answer: "12"
    },
    {
        question: "규민이의 몸무게를 구하는 공식은?",
        choices: ["512 * 512", "512 + 512 + 512", "3 * 3 * 3", "3 + 512"],
        answer: "512 * 512"
    },
    {
        question: "bmi 구하는 공식은?",
        choices: ["키 * 몸무게", "키 + 몸무게 - 몸무게 * 2", "몸무게 / 신장제곱", "512 + 512 * 4 / 2"],
        answer: "몸무게 / 신장제곱"
    },
    {
        question: "가장 먼저 출시된 언어는?",
        choices: ["C", "C++", "파이썬", "자바"],
        answer: "C"
    },
    {
        question: "Excel 2016에서 김규민은 입력했을때 나오는 숫자는?",
        choices: ["뚱떙이", "512", "PIG", "돼지"],
        answer: "512"
    },
    {
        question: "한국이 가장 남쪽에 위치한 섬은?",
        choices: ["울릉도", "제주도", "독도", "마라도"],
        answer: "마라도"
    },
    {
        question: "손흥민이 뛰는 축구 클럽은?",
        choices: ["아스날", "레알 마드리드", "토트넘 핫스퍼", "바르셀로나"],
        answer: "토트넘 핫스퍼"
    },
    {
        question: "배우 조인성의 모교는?",
        choices: ["서강대학교", "중앙대학교", "고려대학교", "연세대학교"],
        answer: "고려대학교"
    },
    {
        question: "세계에서 가장 큰 바다는?",
        choices: ["태평양", "대서양", "인도양", "북극해"],
        answer: "태평양"
    }
];

function checkAnswer() {
    const selected = document.querySelector('input[name="answer' + currentQuestion + '"]:checked').value;
    if (selected === questions[currentQuestion].answer) {
        score += 10;
    }
    currentQuestion++;

    if (currentQuestion < questions.length) {
        renderQuestion();
    } else {
        renderScore();
    }
}

function renderScore() {
    const totalScore = document.getElementById("totalScore");
    totalScore.innerHTML = `${score}점`;
    
    // 다음 버튼 숨기기
    document.querySelector('button').style.display = "none";

    // 최종 점수 출력
    const scoreDiv = document.getElementById("score");
    scoreDiv.style.display = "block";
}

function goBack() {
    currentQuestion--;
    renderQuestion();
}

function renderQuestion() {
    const quiz = document.getElementById("quiz");
    // 현재 문제 번호가 0보다 크면 이전 버튼 추가
    const backButton = currentQuestion > 0 ? '<button onclick="goBack()">이전 문제</button>' : '';
    quiz.innerHTML = `
        <h2>문제 ${currentQuestion + 1}</h2>
        <p>${questions[currentQuestion].question}</p>
        <ul>
            <li><input type="radio" name="answer${currentQuestion}" value="${questions[currentQuestion].choices[0]}">${questions[currentQuestion].choices[0]}</li>
            <li><input type="radio" name="answer${currentQuestion}" value="${questions[currentQuestion].choices[1]}">${questions[currentQuestion].choices[1]}</li>
            <li><input type="radio" name="answer${currentQuestion}" value="${questions[currentQuestion].choices[2]}">${questions[currentQuestion].choices[2]}</li>
            <li><input type="radio" name="answer${currentQuestion}" value="${questions[currentQuestion].choices[3]}">${questions[currentQuestion].choices[3]}</li>
        </ul>
        ${backButton}
        <button onclick="checkAnswer()">${currentQuestion === questions.length - 1 ? '최종 제출' : '다음 문제'}</button>
    `;
}

