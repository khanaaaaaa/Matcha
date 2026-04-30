let board, score, gameOver;

function init() {
    board = Array(16).fill(0);
    score = 0;
    gameOver = false;
    document.getElementById('score').textContent = '0';
    document.getElementById('message').classList.remove('show');
    spawnTile();
    spawnTile();
    render();
}

function spawnTile() {
    const empty = board.reduce((acc, v, i) => v === 0 ? [...acc, i] : acc, []);
    if (!empty.length) return;
    const i = empty[Math.floor(Math.random() * empty.length)];
    board[i] = Math.random() < 0.9 ? 2 : 4;
}

function render(merged = []) {
    document.querySelectorAll('.cell').forEach((cell, i) => {
        const val = board[i];
        cell.textContent = val || '';
        cell.dataset.val = val || '';
        if (merged.includes(i)) {
            cell.classList.remove('pop');
            void cell.offsetWidth;
            cell.classList.add('pop');
        }
    });
}

function slide(row) {
    let arr = row.filter(v => v);
    const mergedIdx = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
            arr[i] *= 2;
            score += arr[i];
            arr.splice(i + 1, 1);
            mergedIdx.push(i);
        }
    }
    while (arr.length < 4) arr.push(0);
    return { arr, mergedIdx };
}

function move(dir) {
    if (gameOver) return;
    const prev = [...board];
    const mergedCells = [];

    [0, 1, 2, 3].forEach(r => {
        let indices;
        if (dir === 'left')  indices = [0,1,2,3].map(c => r*4+c);
        if (dir === 'right') indices = [3,2,1,0].map(c => r*4+c);
        if (dir === 'up')    indices = [0,1,2,3].map(c => c*4+r);
        if (dir === 'down')  indices = [3,2,1,0].map(c => c*4+r);

        const row = indices.map(i => board[i]);
        const { arr, mergedIdx } = slide(row);

        indices.forEach((boardIdx, i) => {
            board[boardIdx] = arr[i];
            if (mergedIdx.includes(i)) mergedCells.push(boardIdx);
        });
    });

    if (board.some((v, i) => v !== prev[i])) {
        spawnTile();
        document.getElementById('score').textContent = score;
        render(mergedCells);
        checkGameOver();
    }
}

function checkGameOver() {
    if (board.includes(2048)) {
        gameOver = true;
        showMessage('★ YOU WIN! ★\nSCORE: ' + score);
        return;
    }
    if (board.includes(0)) return;
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            const i = r * 4 + c;
            if (c < 3 && board[i] === board[i + 1]) return;
            if (r < 3 && board[i] === board[i + 4]) return;
        }
    }
    gameOver = true;
    showMessage('GAME OVER\nSCORE: ' + score);
}

function showMessage(text) {
    const el = document.getElementById('message');
    document.getElementById('message-text').textContent = text;
    el.classList.add('show');
}

document.getElementById('btn-up').onclick    = () => move('up');
document.getElementById('btn-down').onclick  = () => move('down');
document.getElementById('btn-left').onclick  = () => move('left');
document.getElementById('btn-right').onclick = () => move('right');
document.getElementById('btn-restart').onclick = init;

document.addEventListener('keydown', e => {
    const map = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
    if (map[e.key]) { e.preventDefault(); move(map[e.key]); }
});

init();
