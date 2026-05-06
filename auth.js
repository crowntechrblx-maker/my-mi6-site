document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const serviceNumber = document.getElementById('service_number').value;
    const authKey = document.getElementById('auth_key').value;
    const errorMsg = document.getElementById('error-msg');

    // POST the data to our new Vercel API
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceNumber, authKey })
    });

    const result = await response.json();

    if (result.success) {
        // Authenticated! Store the name and clearance level
        localStorage.setItem('isLogged', 'true');
        localStorage.setItem('userName', result.name);
        localStorage.setItem('userClearance', result.clearance);
        
        window.location.href = '/portal';
    } else {
        errorMsg.style.display = 'block';
        errorMsg.textContent = "ACCESS DENIED: SERVICE NUMBER OR AUTH KEY INVALID";
    }
});