import "../styles/global.css";
import "../styles/quizz-question.css";
import { useState } from "react";
import { createQuizzLine } from "../components/QuizzLine";
import QuizzHint1 from "../assets/quizz-hints/quizz-hint-1.png";
import QuizzHint2 from "../assets/quizz-hints/quizz-hint-2.png";
import QuizzHint3 from "../assets/quizz-hints/quizz-hint-3.png";
import QuizzHint4 from "../assets/quizz-hints/quizz-hint-4.png";
import QuizzHint5 from "../assets/quizz-hints/quizz-hint-5.jpeg";
import QuizzHint6 from "../assets/quizz-hints/quizz-hint-6.jpeg";
import QuizzHint7 from "../assets/quizz-hints/quizz-hint-7.png";
import QuizzHint8 from "../assets/quizz-hints/quizz-hint-8.png";

const isEqual = (response) => (answer) => answer.toLowerCase() === response;
const isOneOf = (responses) => (answer) => responses.includes(answer.toLowerCase());

function createQuestion(questionText, questionImg, verifyAnswer, confirmText) {
    return {questionText, "questionImg": questionImg.src, verifyAnswer, confirmText}
}

function Home() {
    const questions = [
        createQuestion(
            "Hummmm... dizem que você é a _________. Será mesmo? Vamos testar!",
            QuizzHint1,
            isEqual("escolhida"),
            "é isso"
        ),
        createQuestion(
            "Está pronta?", 
            QuizzHint2,
            (answer) => {
                const a = answer.toLowerCase();
                return (a.includes("ok") || a.includes("ouk")) && a.includes("do");
            },
            "muito óbvio..."
        ),
        createQuestion(
            "Eu sei que você é _____________, mas pra facilitar, "
            + " a resposta anterior aceitaria qualquer coisa que tivesse \"ok\" ou \"ouk\" e \"do\" nela :p",
            QuizzHint3,
            isEqual("internaxional"),
            "com x mesmo!"
        ),
        createQuestion(
            "A escolhida deve ter bom gosto. Então me diga: Qual o melhor anime do mundo?",
            QuizzHint4,
            isEqual("one piece"),
            "não é Sailor Moon u.u"
        ),
        createQuestion(
            "Seu nome é? (Sem sobrenome, por favor. cof cof)",
            QuizzHint5,
            isOneOf(["carol", "carolina"]),
            "é claro"
        ),
        createQuestion(
            "Seu sobrenome é? (Só o melhor deles. cof cof)",
            QuizzHint6,
            isEqual("tavares"),
            "com certeza"
        ),
        createQuestion(
            "Ok, e se eu fosse me declarar, como eu completaria essa frase: "
            + "\"Te amo tanto que uma _________ não "
            + "seria presente o bastante. Pode ficar comigo "
            + "por inteiro! rsrs\"",
            QuizzHint7,
            isEqual("orelha"),
            "credo"
        ),
        createQuestion(
            "Parece que você é mesmo a escolhida..." +
            "Mas só se me der um ___________, rs",
            QuizzHint8,
            isOneOf(["beijinho", "beijo", "beijão"]),
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