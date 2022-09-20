const express = require(`express`);
const cors = require(`cors`);

const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

const users = [
    {
        id: 1,
        username: `Jonas Schmedtmann`,
        email: `jonas.schmedtmann@gmail.com`,
        pin: `1111`,
        movements: [400, 500, -30, -90, 700, 1000]
    },
    {
        id: 2,
        username: `Mario Statham`,
        email: `mario.statham19@gmail.com`,
        pin: `2222`,
        movements: [3000, -900, -200, 20, 40, 558]
    },
    {
        id: 3,
        username: `Luigi Marcus`,
        email: `luigimarcus@gmail.com`,
        pin: `3333`,
        movements: [220, 240, -235, 1300, 1400, -750]
    }
]

app.get(`/users`, (req, res) => {
    res.status(200).send(users);
})

app.listen(
    port,
    console.log(`Server is running on http://localhost:${port}`)
)