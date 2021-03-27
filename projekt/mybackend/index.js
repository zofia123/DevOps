//importy
const express = require('express');
const cors = require('cors');
const {v4 : uuidv4} = require('uuid');
//tworzenie instancji
const app = express();

app.use(cors());

// {"id":"88445645465ddf-vgfdg4fdg46-gvrdrd456",
//  "nazwa":"Kredki",
//  "rodzaj":"Suche pastele",
//  "ilosc_kolorow":50,
//  "przyklad_dziela":"E. Degas - Dżokeje"}
app.use(express.json());

// Nazwa=Kredki&Rodzaj=Suche%Pastele&Ilosc_kolorow=50& etc.
// https://www.strona.pl/plastyka/88445645465ddf-vgfdg4fdg46-gvrdrd456
app.use(express.urlencoded({extended:true}));


// POSTGRES
const { Pool } = require('pg');
// konfiguracja bazy
const pgClient = new Pool({
    user: "postgres",
    password: "morsowanie",
    database: "postgres",
    host: "mypostgres",
    port: "5432"
});

// tworzenie tabeli 
pgClient.query('CREATE TABLE IF NOT EXISTS przybory (id UUID UNIQUE, nazwa VARCHAR, rodzaj VARCHAR, ilosc_kolorow INT, przyklad_dziela VARCHAR, PRIMARY KEY (id))')
        .catch((err) => {
            console.log(err);
        });

// wyłap błąd 
pgClient.on('error', () => {
    console.log("Nie jesteś podłączony do Postgresa");
});


// REDIS
// konfiguracja redisa
const redis = require("redis");

const redisClient = redis.createClient({
    host: 'myredis', // nazwa kontenera
    port: 6379
});


// mybackend
// konfiguracja endpointów w mybackend

// localhost:8080 lub 127.0.0.1:8080
app.get("/", (req, res) => {
    res.send("Hello World!"); // odpowiedź dla klienta (np. przeglądarka lub narzędzie CURL)
});

// localhost:8080/techniki
app.post('/techniki', function (req, res) {
    const data = req.body;
    const id = uuidv4();
    redisClient.hmset(`${id}`, {'nazwa': `${data.nazwa}`, 'rodzaj': `${data.rodzaj}`, 'ilosc_kolorow': `${data.ilosc_kolorow}`, 'przyklad_dziela': `${data.przyklad_dziela}`});
    pgClient.query(`INSERT INTO przybory (id, nazwa, rodzaj, ilosc_kolorow, przyklad_dziela) VALUES ('${id}', '${data.nazwa}', '${data.rodzaj}', '${data.ilosc_kolorow}', '${data.przyklad_dziela}')`);
    res.send("Dodano technikę do bazy Redis i Postgres");
    console.log('Dodano technikę do bazy Redis i Postgres');
    res.end();
});

// localhost:8080/techniki/d18386e8-61a3-4e3d-9a07-59dbfbde5627
app.get("/techniki/:id", (req, res) => {
    const id = req.params.id;

    redisClient.exists(id, (err, redis_exist) => {
        if (redis_exist == 1) {
            redisClient.hgetall(id, (err, redis_res) => {
                if (err) {
                    console.log(err.stack);
                } else {
                    const data = redis_res;
                    console.log('Redis - wyslal odpowiedz klientowi');
                    res.send(data);
                }
            });
        } else {
            pgClient.query(`SELECT * FROM przybory WHERE id='${id}';`, (err, postgres_res) => {
                if (err) {
                    console.log(err.stack);
                } else {
                    const data = postgres_res.rows[0]
                    console.log('Postgres - wyslal odpowiedz klientowi');
                    res.send(data);
                }
            });
        }
    });

});

// konfiguracja mybackend
const PORT = 5050;
app.listen(PORT, () => {
    console.log(`mybackend API jest na porcie ${PORT}`);
});