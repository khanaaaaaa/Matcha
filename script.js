let board, score;

const cells = () => [...document.querySelectorAll('.cell')];

function init() {
    board = Array(16).fill(0);
    score = 0;
    document.getElementById('score').textContent = '0';
    spawnTile();
    spawnTile();
    render();
}

function spawnTile () {
    const empty = board.reduce((acc, v, i) => v === 0 ? [...acc, i] : acc, []);
    if (!empty.length) return;
    const i = empty[Math.floor(Math.random() * empty.length)];
    board[i] = Math.random() < 0.9 ? 2 : 4;
}

function render() {
    cells().forEach((cell, i) => {
        const val = board[i];
        cell.textContent = val || '';
        cell.dataset.val = val || '';
    })
}

function slide(row) {
    let arr = row.filter(v => v);
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i+1]) {
            arr[i] *= 2;
            score += arr[i];
            arr.splice(i + 1, 1);
        }
    }
    while (arr.length < 4) arr.push(0);
}

function move(dir) {
    const prev = [,,,board];
    const rows = [0,1,2,3];

    rows.forEach(r => {
        let row;
        if (dir === 'left') row = [0,1,2,3].map(c => board[r*4+c]);
        if (dir === 'right') row = [3,2,1,0].map(c => board[r*4+c]);
        if (dir === 'up') row = [0,1,2,3].map(c => board[c*4+r])
        if (dir === 'down') row = [3,2,1,0].map(c => board[c*4+r]);

        const slid = slide(row);

        [0,1,2,3].forEach((c, i) => {
            if (dir === 'left') board [r*4+c] = slid[i];
            if (dir === 'right') board[r*4+(3-c)] = slid[i];
            if (dir === 'up') board[c*4+r] = slid[i];
            if (dir === 'down') board[(3-c)*4+r] = slid[i];
        });
    });

    const changed = board = board.some((v, i) => v !== prev[i]);
    if (changed) {
        spawnTile();
        document.getElementById('score').textContent = score;
        render();
        checkGameOver();
    }
}

