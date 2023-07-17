let currentQuestion = 0;
let score = 0;

const questions = [
    {
        question: "우주에서 제일많은 원소는?",
        choices: ["수소", "아르곤", "탄소", "철"],
        answer: "수소"
    },
    {
        question: "태양보다 질량이큰 항성이 만들수있는 가장무거운원소는?",
        choices: ["탄소", "규소", "철", "붕소"],
        answer: "철"
    },
    {
        question: "자유낙하운동을 할때 속력은 초당 얼마만큼 증가하는가?",
        choices: ["9.8m/s", "9.512m/s", "9.99m/s", "10m/s"],
        answer: "9.8m/s"
    },
    {
        question: "지권과 기권의 상호작용으로 생기는 현상은?",
        choices: ["파도", "황사", "오로라", "지진"],
        answer: "황사"
    },
    {
        question: "단백질을 이루는 구성요소는?",
        choices: ["중성자", "수소", "아미노산", "네온"],
        answer: "아미노산"
    },
    {
        question: "지구상에서 가장단단한 천연 물질은?",
        choices: ["다이아몬드", "풀러렌", "그래핀", "철"],
        answer: "다이아몬드"
    },
    {
        question: "기권중에서 오로라가 발생하는 지점은?",
        choices: ["대류권", "성층권", "중간권", "열권"],
        answer: "열권"
    },
    {
        question: "철 보다 무거운원소가 생기기위한 현상은?",
        choices: ["빅뱅", "초신성폭발", "가스폭발", "풍화작용"],
        answer: "초신성폭발"
    },
    {
        question: "빅뱅이 터지고 38만년이 지난후에 만들어진 최초의 원자는?",
        choices: ["수소", "헬륨", "리튬", "탄소"],
        answer: "수소"
    },
    {
        question: "팬지어스와 윌슨이 발견한것은?",
        choices: ["우주배경복사", "관성의법칙", "안드로메다 은하", "블랙홀"],
        answer: "우주배경복사"
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

// "문제 추가" 버튼 클릭 시, 입력 창과 버튼 생성
function addQuestion() {
    const addQuestionButton = document.getElementById("addQuestionButton");
    addQuestionButton.style.display = "none"; // "문제 추가" 버튼 숨기기

    const inputContainer = document.createElement("div");

    // 문제 입력 창 생성
    const questionInput = document.createElement("input");
    questionInput.type = "text";
    questionInput.placeholder = "문제를 입력하세요";
    inputContainer.appendChild(questionInput);

    // 선택지 입력 칸 생성
    for (let i = 0; i < 4; i++) {
        const choiceInput = document.createElement("input");
        choiceInput.type = "text";
        choiceInput.placeholder = `선택지 ${i + 1}`;
        inputContainer.appendChild(choiceInput);
    }

    // 정답 입력 창 생성
    const answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.placeholder = "정답을 입력하세요";
    inputContainer.appendChild(answerInput);

    // "추가" 버튼 생성
    const addButton = document.createElement("button");
    addButton.textContent = "추가";
    addButton.addEventListener("click", () => {
        const newQuestion = {
            question: questionInput.value,
            choices: Array.from(inputContainer.querySelectorAll("input[type='text']")).slice(1, 5).map(input => input.value),
            answer: answerInput.value
        };
        questions.push(newQuestion);
        renderQuestion();
        inputContainer.remove(); // 입력 창과 버튼 삭제
        addQuestionButton.style.display = "block"; // "문제 추가" 버튼 다시 표시
    });
    inputContainer.appendChild(addButton);

    // "삭제" 버튼 생성
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => {
        inputContainer.remove(); // 입력 창과 버튼 삭제
        addQuestionButton.style.display = "block"; // "문제 추가" 버튼 다시 표시
    });
    inputContainer.appendChild(deleteButton);

    const quiz = document.getElementById("quiz");
    quiz.appendChild(inputContainer);
}

// "문제 추가" 버튼 생성
const addQuestionButton = document.createElement("button");
addQuestionButton.id = "addQuestionButton";
addQuestionButton.textContent = "문제 추가";
addQuestionButton.addEventListener("click", addQuestion);
document.body.appendChild(addQuestionButton);

renderQuestion();
