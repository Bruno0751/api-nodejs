import express from "express";
import { Types } from 'mongoose';
import { ClienteModel } from "./src/models/model.js";
const app = express();
const portApi = 2020;

// Middleware para aceitar JSON
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const clientes = await ClienteModel.find(); // Busca todos os documentos
        return res.json(clientes);
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao buscar clientes', error: err });
    }
});

app.post('/', async (req, res) => {
    try {
        const novoCliente = new ClienteModel(req.body);
        if (!novoCliente.name || typeof novoCliente.name !== 'string') {
            return res.status(400).json({ message: 'Nome é obrigatório e deve ser uma string' });
        }
        await novoCliente.save();
        return res.status(201).json(novoCliente);
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao criar cliente', error: err });
    }
});

app.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body; // Campos a serem atualizados

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        if (!updates.name || typeof updates.name !== 'string') {
            return res.status(400).json({ message: 'Nome é obrigatório e deve ser uma string' });
        }
        // if (!updates.old_year || isNaN(Number(updates.old_year))) {
        //     return res.status(400).json({ message: 'Idade deve ser um número válido' });
        // }
        // if (!updates.height || isNaN(Number(updates.height))) {
        //     return res.status(400).json({ message: 'Altura deve ser um número válido' });
        // }
        const clienteAtualizado = await ClienteModel.findByIdAndUpdate(
            id,
            updates,
            { new: true } // Retorna o novo documento atualizado
        );
        if (!clienteAtualizado) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        return res.json(clienteAtualizado);
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao atualizar cliente', error: err });
    }
});

// Iniciando o servidor
app.listen(portApi, () => {
    console.log(`API rodando em http://localhost:${portApi}`);
});