import express from "express";
import { ClienteModel } from '../models/model.js';
import { validateParam, validateId, testOptions } from "../utl/util.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        testOptions();
        const clientes = await ClienteModel.find(); // Busca todos os documentos
        return res.json(clientes);
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao buscar clientes', error: err });
    }
});

router.post('/', async (req, res) => {
    try {
        const novoCliente = new ClienteModel(req.body);
        validateParam();
        await novoCliente.save();
        return res.status(201).json(novoCliente);
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao criar cliente', error: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        validateId(id);
        const clienteRemovido = await ClienteModel.findByIdAndDelete(id);
        if (!clienteRemovido) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        return res.json({ message: 'Cliente removido com sucesso' });
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao deletar cliente', error: err });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, old_year, height } = req.body;
        validateId(id);
        validateParam();
        const clienteAtualizado = await ClienteModel.findByIdAndUpdate(
            id,
            { name, old_year, height },
            { new: true, overwrite: true }
        );

        if (!clienteAtualizado) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        return res.json(clienteAtualizado);
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao atualizar cliente', error: err });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body; // Campos a serem atualizados
        validateId(id);
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

export const clienteRoutes = router;