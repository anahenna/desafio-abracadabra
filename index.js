import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const nombresUsuarios = [
    "Juan",
    "Jocelyn",
    "Astrid",
    "Maria",
    "Ignacia",
    "Javier",
    "Brian"
]

const validarUsuario = (req, res, next) => {
    const usuario = req.params.usuario;
    if (nombresUsuarios.includes(usuario)) {
        next();
    } else {
        res.sendFile(path.join(__dirname, 'assets', 'who.jpeg'));
    }
};

const numeroAleatorio = () => Math.floor(Math.random()*4) + 1;

app.get('/abracadabra/juego/:usuario', validarUsuario, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/abracadabra/usuarios', (req, res) => {
    return res.json(nombresUsuarios);
});


app.get('/abracadabra/conejo/:n', (req, res) =>{
    const numero = parseInt(req.params.n);
    const random = numeroAleatorio();
    if (numero === random) {
        res.sendFile(path.join(__dirname, 'assets', 'conejito.jpg'));
    } else {
        res.sendFile(path.join(__dirname, 'assets', 'voldemort.jpg'));
    }
})

app.use((req, res) => {
    res.status(404).send("Esta página no existe...")
})

app.use(express.static(path.join(__dirname, 'assets')));

app.listen(3000, () =>{
    console.log(`Servidor andando en puerto: http://localhost:${3000}`)
});
