const express = require('express');
const PORT = 3000;

const dd = (express());

dd.use(express.json());

dd.get ('/', (req, res) => {
    res.send('Hello world');
})

dd.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000' )
})
