const VALID_USERNAME = "student123";
const VALID_PASSWORD = "password123";

const LOGIN_STATUS = {
    INVALID: 0,
    VALID: 1
};

let currentUser = {
    username: "",
    loginStatus: LOGIN_STATUS.INVALID,
    loginTime: null
};

const subjects = {
    "Mathematics": "Topics: Algebra, Geometry, Calculus. Complete assignments and quizzes to track progress.",
    "Science": "Topics: Physics, Chemistry, Biology. Experiment notes and lab reports available.",
    "English": "Topics: Literature, Grammar, Writing. Read essays and complete writing exercises.",
    "History": "Topics: Ancient, Medieval, Modern. Study historical events and timelines.",
    "IT & Programming": "Topics: HTML, CSS, JavaScript, Python. Code samples and tutorials included.",
    "Physical Education": "Topics: Sports, Fitness, Wellness. Track workout progress and health goals."
};

window.addEventListener('load', function() {
    checkExistingLogin();
    setupFormListener();
});

function setupFormListener() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            validateLogin();
        });
    }
}

function validateLogin() {
    // Get input values from form fields
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Determine login status: 1 if valid, 0 if invalid
    const loginResult = (username === VALID_USERNAME && password === VALID_PASSWORD) 
        ? LOGIN_STATUS.VALID 
        : LOGIN_STATUS.INVALID;
    
    // SWITCH STATEMENT to evaluate login status
    switch(loginResult) {
        case LOGIN_STATUS.VALID:
            // Case 1: Login credentials are VALID
            currentUser.username = username;
            currentUser.loginStatus = LOGIN_STATUS.VALID;
            currentUser.loginTime = new Date();
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            showSuccessMessage("✓ Login successful! Redirecting...");
            
            setTimeout(function() {
                window.location.href = 'notebook.html';
            }, 1500);
            break;
            
        case LOGIN_STATUS.INVALID:
            // Case 0: Login credentials are INVALID
            showErrorMessage("⚠️ Invalid username or password. Try: student123 / password123");
            
            document.getElementById('password').value = '';
            break;
            
        default:
            showErrorMessage("An unexpected error occurred.");
            break;
    }
}

function checkExistingLogin() {
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        
        if (currentUser.loginStatus === LOGIN_STATUS.VALID && 
            window.location.pathname.includes('index.html')) {
            window.location.href = 'notebook.html';
        }
    }
}

function showSuccessMessage(message) {
    const successAlert = document.getElementById('successAlert');
    
    if (successAlert) {
        document.getElementById('successMessage').textContent = message;
        successAlert.style.display = 'block';
        successAlert.classList.add('show');
    }
}

function showErrorMessage(message) {
    const errorAlert = document.getElementById('errorAlert');
    
    if (errorAlert) {
        document.getElementById('errorMessage').textContent = message;
        errorAlert.style.display = 'block';
        errorAlert.classList.add('show');
        
        setTimeout(function() {
            errorAlert.style.display = 'none';
        }, 5000);
    }
}

function displayUserInfo() {
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        
        const userDisplay = document.getElementById('userDisplay');
        if (userDisplay) {
            userDisplay.textContent = currentUser.username;
        }
    } else {
        window.location.href = 'index.html';
    }
}

function openSubject(subject) {
    const content = subjects[subject] || "Subject information not found.";
    window.alert(`${subject}\n\n${content}`);
}

function closeSubject() {
    const modal = document.getElementById('subjectModal');
    
    if (modal) {
        modal.style.display = 'none';
    }
}

function logoutUser() {
    localStorage.removeItem('currentUser');
    
    currentUser = {
        username: "",
        loginStatus: LOGIN_STATUS.INVALID,
        loginTime: null
    };
    
    window.alert("You have been logged out successfully.");
    window.location.href = 'index.html';
}

function calculateProgress(courses) {
    let total = 0;
    
    for (let i = 0; i < courses.length; i++) {
        total += courses[i];
    }
    
    const average = total / courses.length;
    
    return average;
}

window.addEventListener('load', function() {
    if (window.location.pathname.includes('notebook.html')) {
        displayUserInfo();
    }
});
