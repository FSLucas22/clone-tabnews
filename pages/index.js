import { useState } from "react";
import { createQuizzLine } from "../components/QuizzLine";

const isEqual = (response) => (answer) => answer.toLowerCase() === response;
const isOneOf = (responses) => (answer) => responses.includes(answer.toLowerCase());

function createQuestion(questionText, verifyAnswer, confirmText) {
    return {questionText, verifyAnswer, confirmText}
}

function Home() {
    const questions = [
        createQuestion(
            "Hummmm... dizem que você é a _________. Será mesmo? Vamos testar!",
            isEqual("escolhida"),
            "é isso"
        ),
        createQuestion(
            "Seu nome é: ____ (Sem sobrenome, por favor. cof cof)",
            isOneOf("carol", "carolina"),
            "é isso"
        ),
        createQuestion(
            "Te amo tanto que uma _________ não "
            + "seria presente o bastante. Pode ficar comigo "
            + "por inteiro! rsrs",
            isEqual("orelha"),
            "credo"
        )
    ];

    const [questionNumber, setQuestionNumber] = useState(0);

    if (questionNumber == questions.length) {
        return <div>
            <p>Parece que você é mesmo a escolhida... 
                mas se é mesmo me dá um beijinho rs"</p>
            <p>Te amo meu bb! &#128536;&#128536;&#128536;</p>
         </div>
    }

    const onCorrect = () => setQuestionNumber(questionNumber+1);
    const CurrentQuestion = createQuizzLine(questions[questionNumber], onCorrect);

    return <div>
        <CurrentQuestion></CurrentQuestion>
    </div>
}

export default Home;