const BACKEND_URL = 'http://localhost:3002';
const teamAName = document.getElementById('team-a');
const teamBName = document.getElementById('team-b');
const battingTeam = document.getElementById('batting-team');
const runsWickets = document.getElementById('runs-wickets');
const overs = document.getElementById('overs');
const commentaryText = document.getElementById('commentary-text');
function updateScoreboard(data) {
    if (!data) return;

    teamAName.textContent = data.teamA || 'TEAM A';
    teamBName.textContent = data.teamB || 'TEAM B';
    battingTeam.textContent = data.battingTeam || 'BATTING';

    const runStr = `${data.runs || 0} / ${data.wickets || 0}`;
    const overStr = `${data.overs || 0}.${data.balls || 0}`;

    runsWickets.textContent = runStr;
    overs.textContent = overStr;
    commentaryText.textContent = data.commentary || 'No recent update';
}
const socket = io(BACKEND_URL);


socket.on('score_update', (newScore) => {
    console.log('Received score update via WebSocket:', newScore);
    updateScoreboard(newScore);
});
document.addEventListener('DOMContentLoaded', () => {
    fetch(`${BACKEND_URL}/api/score`)
        .then(response => response.json())
        .then(data => updateScoreboard(data))
        .catch(error => {
            console.error('Error fetching initial score:', error);
            commentaryText.textContent = "Could not load live score.";
        });
});
function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loggedUser');
    alert("Logged out successfully!");
    window.location.href = "login.html";
}
