import {useState} from 'react';
const Random = (props) => {
    const [question, setQuestion] = useState('');
    const random = (e) => {
        e.preventDefault();
        console.log(props.tickets[1])
        const randomIdx = Math.floor(Math.random() * props.tickets[1].length);
        const randomElement = props.tickets[1][randomIdx][0] + '. ' + props.tickets[1][randomIdx][1];
        setQuestion(randomElement);
    }
    return (
        <div>
            <button onClick={random} className="w-40 mt-2 ml-2 rounded-xl h-8 bg-purple-400 mr-4">Рандомный вопрос</button>
            {question ? question : null}
        </div>
    )
}
export default Random;