// server.js
const express = require('express');
const bodyParser = require('body-parser');
const excel = require('exceljs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para receber os dados do formulário e adicionar à planilha Excel existente
app.post('/cadastrar', (req, res) => {
    const data = req.body;

    const fileName = path.join(__dirname, 'dados', 'banco.xlsx'); // Caminho para a planilha existente

    const workbook = new excel.Workbook();
    workbook.xlsx.readFile(fileName) // Abra a planilha existente
        .then(() => {
            const worksheet = workbook.getWorksheet('colaboradores'); // Obtenha a planilha existente pelo nome

            // Encontre a primeira linha vazia na planilha
            let newRow = 2;
            while (worksheet.getCell(`A${newRow}`).value) {
                newRow++;
            }

            // Mapeamento dos campos do formulário para as células da planilha na próxima linha vazia
            worksheet.getCell(`A${newRow}`).value = data.nome;
            worksheet.getCell(`B${newRow}`).value = data.matricula_cpf;
            worksheet.getCell(`C${newRow}`).value = data.ferias;

            // Salve as alterações na planilha existente
            return workbook.xlsx.writeFile(fileName);
        })
        .then(() => {
            console.log('Dados adicionados à planilha com sucesso!');
            res.sendStatus(200);
        })
        .catch((err) => {
            console.error('Erro ao adicionar dados à planilha:', err);
            res.sendStatus(500);
        });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
