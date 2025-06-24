const BACKEND_URL = 'http://localhost:3002';
const adminForm = document.getElementById('admin-form');
const messageEl = document.getElementById('message');

adminForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    messageEl.textContent = 'Updating...';
    messageEl.style.color = 'orange';

    const formData = new FormData(adminForm);
    const updateData = {};

    for (let [key, value] of formData.entries()) {
        if (value.trim() !== '') {
            updateData[key] = value;
        }
    }

    fetch(`${BACKEND_URL}/api/admin/update-score`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message || 'Update failed') });
        }
        return response.json();
    })
    .then(data => {
        messageEl.textContent = data.message;
        messageEl.style.color = 'green';

        ['runs', 'wickets', 'overs', 'balls', 'commentary'].forEach(name => {
            adminForm.querySelector(`[name="${name}"]`).value = '';
        });
    })
    .catch(error => {
        messageEl.textContent = `Error: ${error.message}`;
        messageEl.style.color = 'red';
    });
});
