import { mongoose } from "../config/db.js";

const ClienteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    old_year: { type: Number, required: false },
    height: { type: Number, required: false },
});

export const ClienteModel = mongoose.model('Cliente', ClienteSchema, 'cliente');