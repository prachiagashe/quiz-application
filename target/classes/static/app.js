let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let userName = "";

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const usernameInput = document.getElementById('username');
    const statusMsg = document.getElementById('api-status');

    // Test Backend API connection on load
    fetch('/api/test')
        .then(response => response.text())
        .then(data => {
            statusMsg.textContent = "Backend Connection: OK 🟢";
            statusMsg.classList.add('text-success');
        })
        .catch(err => {
            statusMsg.textContent = "Backend Connection: Failed 🔴 (Make sure Spring Boot is running)";
            statusMsg.classList.add('text-danger');
        });

    startBtn.addEventListener('click', () => {
        userName = usernameInput.value.trim();
        if (userName === '') {
            alert('Please enter your name to start!');
            return;
        }

        const appContent = document.getElementById('app-content');
        appContent.innerHTML = `
            <div class="card custom-card mx-auto shadow-lg p-4 p-md-5 animate-fade-in text-center">
                <h2 class="text-white mb-3">Welcome, ${userName}!</h2>
                <p class="text-muted mb-4">The quiz is loading...</p>
                <div class="spinner-border text-primary mx-auto" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
        
        fetch('/api/questions')
            .then(res => res.json())
            .then(data => {
                questions = data;
                currentQuestionIndex = 0;
                score = 0;
                
                setTimeout(() => {
                    if(questions.length > 0) {
                        renderQuestion();
                    } else {
                        appContent.innerHTML = `<div class="card custom-card p-5"><h2 class="text-white">No questions found!</h2></div>`;
                    }
                }, 500);
            })
            .catch(err => {
                appContent.innerHTML = `<div class="card custom-card p-5"><h2 class="text-danger">Error loading questions.</h2><p class="text-muted">${err}</p></div>`;
            });
    });
});

function renderQuestion() {
    const appContent = document.getElementById('app-content');
    const q = questions[currentQuestionIndex];
    
    appContent.innerHTML = `
        <div class="card custom-card mx-auto shadow-lg p-4 p-md-5 animate-fade-in text-start">
            <div class="d-flex justify-content-between text-muted small mb-4">
                <span>Question ${currentQuestionIndex + 1} of ${questions.length}</span>
                <span>Player: ${userName}</span>
            </div>
            
            <h2 class="mb-4 fw-bold lh-base text-white">${q.questionText}</h2>
            
            <div class="d-grid gap-3">
                <button class="btn option-btn w-100" onclick="selectOption('A', '${q.correctAnswer}')"><span class="opt-label">A</span> ${q.optionA}</button>
                <button class="btn option-btn w-100" onclick="selectOption('B', '${q.correctAnswer}')"><span class="opt-label">B</span> ${q.optionB}</button>
                <button class="btn option-btn w-100" onclick="selectOption('C', '${q.correctAnswer}')"><span class="opt-label">C</span> ${q.optionC}</button>
                <button class="btn option-btn w-100" onclick="selectOption('D', '${q.correctAnswer}')"><span class="opt-label">D</span> ${q.optionD}</button>
            </div>
        </div>
    `;
}

window.selectOption = function(selectedOption, correctOption) {
    if (selectedOption === correctOption) {
        score++;
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const appContent = document.getElementById('app-content');
    const percentage = Math.round((score / questions.length) * 100);
    
    let grade = "F";
    let color = "#F87171"; // Red
    
    if(percentage >= 90) { grade = "A"; color = "#34D399"; } // Green
    else if(percentage >= 80) { grade = "B"; color = "#60A5FA"; } // Blue
    else if(percentage >= 70) { grade = "C"; color = "#FBBF24"; } // Yellow
    else if(percentage >= 60) { grade = "D"; color = "#F97316"; } // Orange

    appContent.innerHTML = `
        <div class="card custom-card mx-auto shadow-lg p-4 p-md-5 animate-fade-in text-center">
            <h2 class="text-white mb-2">Quiz Completed! 🎉</h2>
            <p class="text-muted">Great job, ${userName}!</p>
            
            <div class="display-1 fw-bold my-4" style="color: ${color};">
                ${score}<span class="fs-4 text-secondary">/${questions.length}</span>
            </div>
            
            <div class="d-flex justify-content-center gap-5 mb-5">
                <div>
                    <div class="small text-muted text-uppercase tracking-wider">Accuracy</div>
                    <div class="fs-3 fw-bold">${percentage}%</div>
                </div>
                <div>
                    <div class="small text-muted text-uppercase tracking-wider">Grade</div>
                    <div class="fs-3 fw-bold" style="color: ${color};">${grade}</div>
                </div>
            </div>
            
            <button class="btn btn-primary custom-btn w-100 py-2 fs-5" onclick="location.reload()">Play Again</button>
        </div>
    `;
}
