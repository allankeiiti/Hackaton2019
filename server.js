const express = require('express'), cors = require('cors'), morgan = require('morgan'), bodyParser = require('body-parser');
const Correios = require('node-correios');
let correios = new Correios();

var port = 7080;
var app = express();
var teste = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.listen(port, function() {
    console.log('servidor iniciado na porta ' + port);
})

app.get
(
    '/',
    function ( req, res ) {
        res.status(200).json({ msg : 'Api funcionando' })
    }
)


app.post
(
    '/calcularFretePrazo',
    function ( req, res ) {
       // var teste = [];
        req.body.forEach(element => {
            let args = {
                nCdEmpresa : element.empresa,  
                sDsSenha : element.senha,
                sCepOrigem : element.origem,
                sCepDestino : element.destino,
                nCdServico : element.servico,
                nVlPeso : element.peso,
                nCdFormato : element.formato,        
                nVlComprimento : element.comprimento,
                nVlAltura : element.altura,
                nVlLargura : element.largura,
                nVlDiametro : element.diametro,
                sCdMaoPropria : element.maoPropria,
                valor : element.valor,
                nVlValorDeclarado : element.valorDeclarado,
                sCdAvisoRecebimento : element.avisoRecebimento
            };
    
                correios.calcPrecoPrazo(args)
               .then( result => {
                console.log('temos esse result: ' , result[0].Codigo);   
                setTimeout(() => {
                    let objt = {Codigo :result[0].Codigo,Valor : result[0].Valor }
                    teste(objt);
                }, 6000);
               })
               .catch(error => {
                //console.log(error);
                return res.status(201).send(result);
               });
        }); 

       // console.log('retorno fora do array: ', teste);
        //return res.status(200).send(teste);
    
        
    })
    
    function teste(loucura){
        teste.push(loucura);
        console.log('Temos isso: ' , teste);
    }
