import express from "express";

const routerOptions = express.Router();
const allowedOrigins = [
    'localhost:3000',
    'localhost:202'
];

routerOptions.options('/', (req, res) => {
    const host = req.headers.host;
    console.log('option')

    if (!allowedOrigins.includes(host)) {
        return res.status(404).json({ message: 'ACCESS DENIED', error: 'NOT FOUND' });
    }

    res.set({
        // 'X-Powered-By': 'Express', DEFAULT
        // 'Allow': 'GET,POST,OPTIONS,PATCH,PUT,DELETE',
        // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,PATCH,PUT,DELETE',
        // 'Access-Control-Allow-Headers': 'Content-Type',
        // 'Access-Control-Allow-Origin': '*'
    });
    return res.sendStatus(204); // Sem conteúdo, mas sucesso
});

router.head("/", async (req, res) => {
    try {
        // Você pode fazer alguma lógica aqui, como verificar se há dados:
        const hasClientes = await ClienteModel.exists({});
        if (hasClientes) {
            return res.status(200).end(); // Retorna apenas os headers, sem corpo
        } else {
            return res.status(404).end(); // Também sem corpo, mas com status 404
        }
    } catch (err) {
        return res.status(500).end();
    }
});

export const optionsRouter = routerOptions;