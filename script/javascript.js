/* Seleção de elementos */
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");

// Novas funcionalidades - abrir campo de gerar senha 
const openCloseGeneratorButton = document.querySelector("#open-generate-password") // botão para abrir e fechar o campo de gerar senha

const generatePasswordContainer = document.querySelector("#generate-options")// exibir no conteiner dps
const lengthInput = document.querySelector("#length") // saber quantas caracteres vai ter a senha
const lettersInput = document.querySelector("#letters") // saber se vai ter letras
const numbersInput = document.querySelector("#numbers") // saber se vai ter números
const symbolsInput = document.querySelector("#symbols") // saber se vai ter símbolos
const copyPasswordButton = document.querySelector("#copy-password") // botão de copiar senha


/* Funções  */
// Letras, Números e Símbolos para gerar a senha
// gerar letra minúscula 
const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() *26) + 97);
};
// gerar letra maiúscula
const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() *26) + 65);
};
// gerar número
const getNumber = () => {
    return Math.floor(Math.random() * 10).toString()
}
// gerar símbolos 
const getSymbol = () => {
    const symbols = "!@#$%^&*()_+{}[];:<>?,./~`-=";
    return symbols[Math.floor(Math.random() * symbols.length)]
}

/* lógica para gerar a senha */

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {
    let password = "";

    /* Segunda versão - definir tamanho da senha */ 
    /* fazer o mapeamento que o usuário escolheu para gerar a senha */

    const passwordLength =  +lengthInput.value; // o valor que o usuário escolheu no campo de input para caracteres da senha 

    const generators = []; // array vazio para adicionar as funções que o usuário escolheu

    if(lettersInput.checked ) { // se estiver marcado o checkbox de letras
        generators.push(getLetterLowerCase, getLetterUpperCase);

    }

    if(numbersInput.checked) { // se estiver marcado o checkbox de números
        generators.push(getNumber);

    }

    if(symbolsInput.checked) { // se estiver marcado o checkbox de símbolos
        generators.push(getSymbol);

    }

    console.log(generators.length)

    /* checagem se o usuário não escolheu nenhuma opção */
    if(generators.length === 0) {
        alert("Escolha ao menos duas opções para gerar a senha!")
        return;
    }
    

    for(i = 0; i < passwordLength; i = i + generators.length) {
        generators.forEach(() => {

            const randomValue =
             generators[Math.floor(Math.random() * generators.length)]();

            password += randomValue;
        });
    }
    password = password.slice(0, passwordLength)
    generatedPasswordElement.style.display = "block";
    generatedPasswordElement.querySelector("h4").innerText = password;
    console.log(password)
}



/* Eventos , click */
generatePasswordButton.addEventListener("click", () => {
        generatePassword(
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol
    );
});

/* Abrir e fechar campo de gerar senha */ 
openCloseGeneratorButton.addEventListener("click", () => {
    generatePasswordContainer.classList.toggle("hide");


});

/* cópia senha gerada pelo campo de gerar senha e manda para clipboard (Ctrl C) */
copyPasswordButton.addEventListener("click", (e) => {
    e.preventDefault();

    // pegar a senha do gerada para coloca no ctrl+C 
    const password = generatedPasswordElement.querySelector("h4").innerText // aqui estar a senha 

    // API (navigator) vai passa a cópia da senha (texto) para o (clipboard -> Ctrl C ) 
    navigator.clipboard.writeText(password).then(() => {

        // função que vai aparece assim que a senha for copiada com sucesso
        copyPasswordButton.innerText = "Senha copiada com secesso!" 

        //fazer o botão voltar para como tava antes depois de um tempo 
        setTimeout(()=> {
            copyPasswordButton.innerText= "Copiar"
        }, 1000 /* 1000 segundos */ )

    });
});

















