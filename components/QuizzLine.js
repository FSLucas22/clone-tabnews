import { useState, useEffect } from "react";
import correct from "../assets/sound-effects/correct.mp3";
import incorrect from "../assets/sound-effects/incorrect.mp3";

function QuizzLine(props) {
    const {
        question, 
        questionImg,
        placeholder, 
        verifyAnswer, 
        confirmText, 
        onCorrect,
    } = props
        
    const [correctSound, setCorrectSound] = useState(null);
    const [incorrectSound, setIncorrectSound] = useState(null);

    useEffect(() => {
        setCorrectSound(new Audio(correct));
        setIncorrectSound(new Audio(incorrect));
    }, []);

    const [answer, setAnswer] = useState("")

    const [buttonConfirmText, setButtonConfirmText] = useState(confirmText || "acho que acertei!");

    return <div className="quizz-container">
        <div className="quizz-question-container">
            <p className="quizz-question">{question}</p>
            <img 
                className="quizz-question-img"
                src={questionImg}></img>
        </div>
        <div className="quizz-answer-container">
            <input type="text"
                className="quizz-answer-text"
                name="nome"
                autoComplete="off"
                placeholder={placeholder || "completa aí rs"}
                value={answer}
                onChange={(evento) => setAnswer(evento.target.value)}
            />
            
            <button className="quizz-answer-btn"
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
    </div>
}


function createQuizzLine(question, onCorrect) {
    return () => <QuizzLine
        question = {question.questionText}
        questionImg = {question.questionImg}
        verifyAnswer = {question.verifyAnswer}
        confirmText = {question.confirmText}
        onCorrect = {onCorrect}
    ></QuizzLine>
}


export {QuizzLine, createQuizzLine};
