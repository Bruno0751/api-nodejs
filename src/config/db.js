import mongoose from 'mongoose';
const url = 'mongodb://localhost:27017/api_mongodb';
mongoose.connect(url, {})
    .then(() => console.log('Conectado ao MongoDB!'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

export { mongoose };
