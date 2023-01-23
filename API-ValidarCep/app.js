const form = document.getElementById("form")
const cep = document.getElementById("cep")
const rua = document.getElementById("rua")
const cidade = document.getElementById("cidade")
const uf = document.getElementById("uf")


form.addEventListener("submit", (e) => {
    e.preventDefault()//cancela o pedido, para não haver uma requsição desnecessária, verifica erros
    consultarCep(cep, rua, cidade, uf)
})


/*Usar o fetch aqui
Exemplo CEP: 500600-01*/
function consultarCep(c, r, cd, u) { //o C é o valor do cep, que vai ser inserido no inputi cep
    /*let cVlue = c.value //recebe o valor que foi isnerido no campo input c = cep
    console.log(cVlue)*/
    let cValue = c.value.replace(".","").replace("-","")// dentro do replace, o primeiro parametro é o que nós procuramos e o segundo é o que nós queremos substituir

    if (cValue != "" || c.cValue != null){ //se cValue é diferente de vazio ou diferente de nulo, vai rodar o bloco de validar campo
    const p = document.getElementById("cep-invalido")

        if(validarCep(cValue)){ //true
            // realiza a concatenação com o input dos dados que vamos receber
            let url = "https://viacep.com.br/ws/" + cValue + "/json/"

            //fetch retorna uma promessa de algo que vai acontecer
            fetch(url).then(res => {//no res guardamos o a nossa respsta
                return res.json() //estamos garantindo que retornará no formato json 
            }).then(saida => {
                r.value = saida.logradouro
                cd.value = saida.localidade
                u.value = saida.uf
            })

            cep.className = "form-control is-valid"//muda o nome da classe, para que fique com as bordas verdes
            p.style.display = "none" //torna o feedback invisível

        } else{ //false
            /*quando a validação for efetuada e for false, irá mudar o nome da classe
            como se estivesse concatennado o nome is-invalid no nome da classe no input CEP NO HTML*/
            cep.className = "form-control is-invalid" //muda o nome da classe, para que fique com as bordas vermelhas
            p.style.display = "block" //torna o feedback visível
        }    
}

    //console.log(cValue) = mostraria o retorno do que foi inserido, no console
}

function validarCep(cv) {
    let re = /^[0-9]{8}$/ //só aceita 8 digitos, onde devem ser de 0 a 9
    return re.test(cv)
}



