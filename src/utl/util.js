import { Types } from 'mongoose';
import express from "express";

const app = express();

export const validateParam = () => {
    if (!novoCliente.name || typeof novoCliente.name !== 'string') {
        return res.status(400).json({ message: 'Nome é obrigatório e deve ser uma string' });
    }
    if (!novoCliente.old_year || isNaN(Number(novoCliente.old_year))) {
        return res.status(400).json({ message: 'Idade deve ser um número válido' });
    }
    if (!novoCliente.height || isNaN(Number(novoCliente.height))) {
        return res.status(400).json({ message: 'Altura deve ser um número válido' });
    }
};
export const validateId = (id) => {
    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
};