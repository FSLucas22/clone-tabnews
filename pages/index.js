import { useState } from "react";

const isEqual = (response) => (answer) => answer.toLowerCase() === response
const isOneOf = (responses) => (answer) => responses.includes(answer.toLowerCase())

function Home() {
    return <div>
    <QuizzLine
        question = {"Hummmm... dizem que você é a _________. Será mesmo? Vamos testar!"}
        verifyAnswer = {isEqual("escolhida")}
        confirmText = {"é isso"}
    ></QuizzLine>
    <QuizzLine
        question = {"Seu nome é: ____ (Sem sobrenome, por favor. cof cof)"}
        verifyAnswer = {isOneOf(["carol", "carolina"])}
        confirmText = {"é claro"}
    ></QuizzLine>
    <QuizzLine 
        question = {"Te amo tanto que uma _________ não "
                + "seria presente o bastante. Pode ficar comigo "
                + "por inteiro! rsrs"}
        verifyAnswer = {isEqual("orelha")}
        confirmText = {"credo"}
    ></QuizzLine>
    </div>
}

function QuizzLine(props) {
    const {question, placeholder, verifyAnswer, confirmText} = props
    
    const [answer, setAnswer] = useState("")

    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    if (isAnswerCorrect) {
        return <p>Acertoooou!</p>
    }

    return <div>
        <p>{ question }</p>
        <input
            type="text"
            name="nome"
            autoComplete="off"
            placeholder={placeholder || "completa aí rs"}
            className="col-12"
            value={answer}
            onChange={(evento) => setAnswer(evento.target.value)}
          />
        
        <button 
            onClick={() => setIsAnswerCorrect(verifyAnswer(answer))}>
        {confirmText || "acho que acertei!"}</button>
    </div>
}

export default Home;