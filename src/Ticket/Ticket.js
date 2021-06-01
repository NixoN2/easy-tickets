const Ticket = (props) => {
    const onCheck = (e) => {
        if (e.target.checked){
            props.setDone(props.done + 1);
        }else{
            props.setDone(props.done - 1);
        }
    }
    return (
        <div className="flex">
            <p className="ml-2 mr-3">{props.position}:</p>
            <p>{props.text}</p>
            <input className="w-4 h-4 ml-2 mt-1" onChange={onCheck} type="checkbox"/>
        </div>
    )
}

export default Ticket;