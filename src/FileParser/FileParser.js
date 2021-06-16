import React, {useState} from 'react';
const FileParser = (props) => {
    const [listName, setListName] = useState('');
    const [file, setFile] = useState([]);
    const [pdfFile, setPdfFile] = useState(null);
    const [pages, setPages] = useState([]);
    const onListNameChange = (e) => {
        setListName(e.target.value);
    }
    const fileOnChange = async (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target.result;
            const tickets = text.split(';');
            const ranges = [];
            let result = [];
            tickets.forEach(ticket => {
                let divided = ticket.split('|')[0].split(' ');
                let range = ticket.split('|')[1];
                range = [Number(range.split('-')[0]),Number(range.split('-')[1])]
                ranges.push(range);
                if (divided[0] === ''){
                    divided[0] = divided[1];
                }
                result.push([divided[0].match( /\d+/g)[0], divided.slice(1).join(' ')]);

            })
            setFile(result);
            setPages(ranges);
        }
        reader.readAsText(e.target.files[0],'windows-1251');
    }

    const pdfOnChange = async (e) =>{
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async(e) => {
            setPdfFile(e.target.result);
            props.setPdf(e.target.result);
            if (e.target.result){
                props.setPdfDownloaded(true);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const addList = (e) => {
        e.preventDefault()
        if (pdfFile){
            props.setPdfDownloaded(true);
        }
        props.setTickets([listName, file, [...file.map(item => false)], pages]);
        props.setTotal(file.length);
        localStorage.setItem('lists',JSON.stringify(props.lists ? props.lists.concat([[listName, file,[...file.map(item => false)],pages]]) : [].concat([[listName, file,[...file.map(item => false)],pages]])))
        localStorage.setItem('listNames',JSON.stringify(props.listNames ? props.listNames.concat(listName) : [].concat(listName)));
        props.setLists(props.lists ? props.lists.concat([[listName, file,[...file.map(item => false)],pages]]) : [].concat([[listName,file,[...file.map(item => false)],pages]]))
        props.setListNames(props.listNames ? props.listNames.concat(listName) : [].concat(listName));
        setListName('');
        document.getElementById('listName').value = '';
        document.getElementById('file').value="";
        document.getElementById('pdf').value="";
        setFile([]);
    }
    return (
    <div>
        <input onChange={onListNameChange} id="listName" className="mt-2 ml-2 w-64 h-8 rounded-lg" type="text" placeholder="Введите название списка: "/>
        <label className="ml-3" for="file">Выберите файл с вопросами:</label>
        <input className="mt-2 ml-2" id="file" onChange={fileOnChange} type="file"/>
        <label className="ml-3" for="pdf">Выберите PDF-файл с материалами:</label>
        <input className="ml-2" onChange={pdfOnChange} type="file" id="pdf"/>
        <button onClick={addList} className="w-24 h-8 bg-purple-400 rounded-xl">Добавить</button>
    </div>);
}

export default FileParser;