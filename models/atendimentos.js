const moment = require('moment')
const { format } = require('../infraestrutura/conexao')
const conexao = require('../infraestrutura/conexao')

class Atendimento{
    adiciona(Atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-SS HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.cliente.lenght >= 5

        const validacoes = [
            {
                nome : 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
        },
        {
            nome: 'cliente',
            valido: clienteValido,
            mensagem: 'Cliente deve ter no mínimo 5 caracteres'
        }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }else{
            const atendimentoDatado = {...atendimento,dataCriacao, data}
        const sql = 'INSERT INTO Atendimentos SET ?'

        conexao.query(sql, atendimentoDatado, (erro, resultados)=> {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(201).json(atendimento)
            }
        })
        }
        
    }

    lista(res){
        const sql = 'SELECT FROM Atendimentos'

        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id,res){
        const sql = 'SELECT * FROM Atendimentos WHERE ID=${id}'

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(atendimento)
            }
        })

    }

    altera(id, valores, res){

        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        conexao.query(sql, [valores,id], (erro,resultados) => {
            if (erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id,res){
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        conexao.query(sql,id,(erro,resultados)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento