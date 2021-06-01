import React, {useState} from 'react';
const FileParser = (props) => {
    const [listName, setListName] = useState('');
    const [file, setFile] = useState([]);
    const onListNameChange = (e) => {
        setListName(e.target.value);
    }
    const fileOnChange = async (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target.result;
            const tickets = text.split(';');
            let result = [];
            tickets.forEach(ticket => {
                let divided = ticket.split(' ');
                if (divided[0] === ''){
                    divided[0] = divided[1];
                }
                result.push([divided[0].match( /\d+/g)[0], divided.slice(1).join(' '), false]);
                console.log(result);
            })
            setFile(result);
        }
        reader.readAsText(e.target.files[0],'windows-1251');
    }
    const addList = (e) => {
        e.preventDefault()
        props.setTickets([listName, file]);
        props.setTotal(file.length);
        localStorage.setItem('lists',JSON.stringify(props.lists ? props.lists.concat([[listName, file]]) : [].concat([[listName, file]])))
        localStorage.setItem('listNames',JSON.stringify(props.listNames ? props.listNames.concat(listName) : [].concat(listName)));
        props.setLists(props.lists ? props.lists.concat([[listName, file]]) : [].concat([[listName,file]]))
        props.setListNames(props.listNames ? props.listNames.concat(listName) : [].concat(listName));
        setListName('');
        document.getElementById('listName').value = '';
        document.getElementById('file').value="";
        setFile([]);
    }
    return (
    <div>
        <input onChange={onListNameChange} id="listName" className="mt-2 ml-2 w-64 h-8 rounded-lg" type="text" placeholder="Введите название списка: "/>
        <input className="mt-2 ml-2" id="file" onChange={fileOnChange} type="file"/>
        <button onClick={addList} className="w-24 h-8 bg-purple-400 rounded-xl">Добавить</button>
    </div>);
}

export default FileParser;