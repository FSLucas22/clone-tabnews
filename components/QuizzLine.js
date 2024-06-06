import { useState } from "react";

function QuizzLine(props) {
    const {
        question, 
        placeholder, 
        verifyAnswer, 
        confirmText, 
        onCorrect
    } = props
    
    const [answer, setAnswer] = useState("")

    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    if (isAnswerCorrect) {
        onCorrect();
        return <p>Acertou!!!!!</p>
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


function createQuizzLine(question, onCorrect) {
    return () => <QuizzLine
        question = {question.questionText}
        verifyAnswer = {question.verifyAnswer}
        confirmText = {question.confirmText}
        onCorrect = {onCorrect}
    ></QuizzLine>
}


export {QuizzLine, createQuizzLine};
