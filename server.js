const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/rota', (req, res) => {
    res.send('Minha primeira rota!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.get('/consulta-cep/:cep', async(req, res) => {
    const cep = req.params.cep;
    // Regex para validar o formato do CEP
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;

    // Verifica se o CEP é válido
    if (!cepRegex.test(cep)) {
        return res.status(400).send({ error: 'CEP Inválido' });
    } else {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            res.json(response.data);
        } catch (error) {
            console.error('Erro ao fazer requisição', error);
            res.status(500).send('Erro ao consultar o CEP');
        }
    }
});