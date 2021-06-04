import Ticket from '../Ticket/Ticket';
const TicketList = (props) => {
    const onDelete = (e) => {
        e.preventDefault();
        const name = props.tickets[0];
        for (let i = 0; i < props.lists.length; ++i){
            if (props.lists[i][0] === name){
                props.setLists(props.lists.splice(i,1));
                localStorage.setItem('lists', JSON.stringify(props.lists));
            }
        }
        for (let i = 0; i < props.listNames.length; ++i){
            if (props.listNames[i] === name){
                props.setListNames(props.listNames.splice(i,1));
                localStorage.setItem('listNames', JSON.stringify(props.listNames));
            }
        }
    }
    return (
        <div className="w-screen">
            <button onClick={onDelete} className="w-32 h-8 bg-purple-400 rounded-xl ml-2 mt-2">Удалить</button>
            {props.tickets[1] ? props.tickets[1].map((ticket,idx) => <Ticket position={ticket[0]} lists={props.lists} setLists={props.setLists} text={ticket[1]} setTickets={props.setTickets} checked={props.tickets[2][idx]} idx={idx} done={props.done} tickets={props.tickets} setDone={props.setDone}/>) : null}
        </div>
    )
}

export default TicketList;