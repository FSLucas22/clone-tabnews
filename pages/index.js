import { useState } from "react";

function Home() {
    return <QuizzLine 
        question = {"Te amo tanto que uma _________ não "
                + "seria presente o bastante. Pode ficar comigo "
                + "por inteiro! rsrs"}
        placeholder = {"completa aí rs"}
        verifyAnswer = {(answer) => answer.toLowerCase() === "orelha"}>
    </QuizzLine>
}

function QuizzLine(props) {
    const {question, placeholder, verifyAnswer} = props
    
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
            placeholder={placeholder}
            className="col-12"
            value={answer}
            onChange={(evento) => setAnswer(evento.target.value)}
          />
        
        <button 
            onClick={() => setIsAnswerCorrect(verifyAnswer(answer))}>
        Acho que acertei!</button>
    </div>
}

export default Home;