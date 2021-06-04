import React, {useState} from 'react';
import FileParser from './FileParser/FileParser';
import Progress from './Progress/Progress';
import TicketList from './TicketsList/TicketList';
import Random from './Random/Random';
const App = () => {
    let ticketLists = JSON.parse(localStorage.getItem('lists'));
    let names = JSON.parse(localStorage.getItem('listNames'));
    const [lists, setLists] = useState(ticketLists != null ? ticketLists : []);
    const [listNames, setListNames] = useState(names != null ? names : []);
    const [tickets, setTickets] = useState([]);
    const [total, setTotal] = useState(0);
    const [done, setDone] = useState(0);
    const selectOnChange = (e)=>{
        e.preventDefault();
        for (let i = 0; i < lists.length; ++i){
            if (e.target.value === lists[i][0]){
                setTickets(lists[i]);
                setTotal(lists[i][1].length);
                setDone(lists[i][2].filter(item => item === true).length);
            }
        }
    }
    return (
        <div className="w-screen h-screen bg-blue-200 overflow-y-scroll overflow-x-hidden">
            <div>
                <select defaultValue="default" onChange={selectOnChange} className="mt-2 ml-2">
                    <option disabled value="default" hidden>Выберите экзамен</option>
                    {listNames ? listNames.map(listName => <option>{listName}</option>) : null}
                </select>
                <FileParser setTickets={setTickets} setTotal={setTotal} lists={lists} setLists={setLists} setListNames={setListNames} listNames={listNames}/>
                <Progress total={total} done={done}/>
                <Random tickets={tickets}/>
                <TicketList lists={lists} setLists={setLists} setTickets={setTickets} listNames={listNames} setListNames={setListNames} tickets={tickets} done={done} setDone={setDone} />
            </div>
        </div>
    )
}

export default App;