const express = require('express');
const PORT = 3000;

const dd = express();
dd.use(express.json());

dd.get('/', (req, res) => {
    res.send('hello world');
});

let game = [
    { id: 1, judul: 'God of War', studio: 'Santa Monica', Createdby: 'David Jaffe' },
    { id: 2, judul: 'Death Stranding', studio: 'Kojima Production', Createdby: 'Hideo Kojima' },
    { id: 3, judul: 'Ghost of Tsushima', studio: 'Sucker Punch Production', Createdby: 'Darren Bridges' }
];

dd.get('/game', (req, res) => {
    res.status(200).json({
        message: 'Berhasil mendapatkan data game',
        data: game
    });
});

dd.get('/game/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cariGame = game.find(g => g.id === id);
    if (!cariGame) {
        return res.status(404).json({
            message: 'Game tidak ditemukan'
        });
    }
    res.status(200).json({
        message: 'Mendapatkan data game',
        data: cariGame
    });
});

dd.post('/tambah-game', (req, res) => {
    const id = game.length + 1;
    const { judul, studio, Createdby } = req.body;

    if (!judul || !studio || !Createdby) {
        return res.status(400).json({
            message: 'Judul, studio, dan Createdby harus diisi'
        });
    }

    const newGame = { id, judul, studio, Createdby };
    game.push(newGame);

    res.status(201).json({
        message: 'Berhasil menambahkan game',
        data: newGame
    });
});

dd.put('/edit-game/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { judul, studio, Createdby } = req.body;
    const cariGame = game.find(g => g.id === id);

    if (!cariGame) {
        return res.status(404).json({
            message: 'Game tidak ditemukan'
        });
    }

    if (!judul || !studio || !Createdby) {
        return res.status(400).json({
            message: 'Judul, studio, dan Createdby harus diisi'
        });
    }

    cariGame.judul = judul;
    cariGame.studio = studio;
    cariGame.Createdby = Createdby;

    res.status(200).json({
        message: 'Berhasil mengedit data game',
        data: cariGame
    });
});

dd.delete('/hapus-game/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = game.findIndex(g => g.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: 'Data game Game tidak dapat ditemukan'
        });
    }

    game.splice(index, 1);
    res.status(200).json({
        message: 'Berhasil menghapus  game'
    });
});

dd.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

