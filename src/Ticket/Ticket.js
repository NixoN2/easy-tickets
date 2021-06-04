import {useState} from 'react';
const Ticket = (props) => {
    const onCheck = (e) => {
        e.preventDefault();
        if (props.checked){
            props.setDone(props.done - 1);
        }else{
            props.setDone(props.done + 1);
        }
        localStorage.setItem('lists',JSON.stringify(props.lists.filter(list => list[0] !== props.tickets[0]).concat([[props.tickets[0], props.tickets[1], props.tickets[2].slice(0,props.idx).concat([!props.checked]).concat(props.tickets[2].slice(props.idx+1))]])))
        props.setTickets([props.tickets[0], props.tickets[1], props.tickets[2].slice(0,props.idx).concat([!props.checked]).concat(props.tickets[2].slice(props.idx+1))])
        props.setLists(props.lists.filter(list => list[0] !== props.tickets[0]).concat([props.tickets]))
    }
    return (
        <div className="flex">
            <p className="ml-2 mr-3">{props.position}:</p>
            <p>{props.text}</p>
            <button onClick={onCheck} className={`w-5 rounded-sm h-5 mt-1 ml-1 ${props.checked ? 'bg-blue-500' : 'bg-white'}`}></button>
        </div>
    )
}

export default Ticket;