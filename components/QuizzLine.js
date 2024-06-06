import { useState, useEffect } from "react";
import correct from "../assets/sound-effects/correct.mp3";
import incorrect from "../assets/sound-effects/incorrect.mp3";

function QuizzLine(props) {
    const {
        question, 
        placeholder, 
        verifyAnswer, 
        confirmText, 
        onCorrect
    } = props
    
    const [correctSound, setCorrectSound] = useState(null);
    const [incorrectSound, setIncorrectSound] = useState(null);

    useEffect(() => {
        setCorrectSound(new Audio(correct));
        setIncorrectSound(new Audio(incorrect));
    }, []);

    const [answer, setAnswer] = useState("")

    const [buttonConfirmText, setButtonConfirmText] = useState(confirmText || "acho que acertei!");

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
            onClick={() => {
                if (verifyAnswer(answer)) {
                    correctSound.play();
                    onCorrect()
                } else {
                    incorrectSound.play();
                    setButtonConfirmText("tenta dnv :p");
                }
            }}>
        {buttonConfirmText}</button>
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
