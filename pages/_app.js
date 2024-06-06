import "../styles/global.css";
import "../styles/quizz-question.css";
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
            "Está pronta?", 
            (answer) => {
                const a = answer.toLowerCase();
                return (a.includes("ok") || a.includes("ouk")) && a.includes("do");
            },
            "muito óbvio..."
        ),
        createQuestion(
            "Eu sei que você é _____________, mas pra facilitar, "
            + " a resposta anterior aceitaria qualquer coisa que tivesse \"ok\" ou \"ouk\" e \"do\" nela :p",
            isEqual("internaxional"),
            "com x mesmo!"
        ),
        createQuestion(
            "A escolhida deve ter bom gosto. Então me diga: Qual o melhor anime do mundo?",
            isEqual("one piece"),
            "não é Sailor Moon u.u"
        ),
        createQuestion(
            "Seu nome é? (Sem sobrenome, por favor. cof cof)",
            isOneOf("carol", "carolina"),
            "é claro"
        ),
        createQuestion(
            "Seu sobrenome é? (Só o melhor deles. cof cof",
            isEqual("tavares"),
            "com certeza"
        ),
        createQuestion(
            "Ok, e se eu fosse me declarar como você completaria essa frase: "
            + "\"Te amo tanto que uma _________ não "
            + "seria presente o bastante. Pode ficar comigo "
            + "por inteiro! rsrs\"",
            isEqual("orelha"),
            "credo"
        ),
        createQuestion(
            "Parece que você é mesmo a escolhida..." +
            "Mas só se me der um ___________ rs",
            isEqual("beijinho"),
            "Tem que fazer na vida real também rs"
        )
    ];

    const [questionNumber, setQuestionNumber] = useState(0);

    if (questionNumber == questions.length) {
        return <div>
            <p className="quizz-done">Te amo meu bb! &#128536;&#128536;&#128536;</p>
         </div>
    }

    const onCorrect = () => setQuestionNumber(questionNumber+1);
    const CurrentQuestion = createQuizzLine(questions[questionNumber], onCorrect);

    return <div>
        <CurrentQuestion></CurrentQuestion>
    </div>
}

export default Home;