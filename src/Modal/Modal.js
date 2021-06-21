import React, {useState} from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

const Modal = (props) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }


    const visible = props.show ? 'fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 block' : 'fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 hidden';
    // const numberOfPages = props.pages && props.pages[props.ticket] && props.pages[props.ticket][1]-props.pages[props.ticket][0] + 1;
    let pagesArray=[];
    if (props.pages && props.pages[props.ticket]){
        const pages = [...props.pages[props.ticket]];
        pages.forEach((ticketPages) => {
            if (ticketPages.split('-').length === 1){
                pagesArray.push(Number(ticketPages));
            }
            else{
                const range = ticketPages.split('-');
                const range1 = Number(range[0]);
                const range2 = Number(range[1]);
                for (let i = range1; i <= range2; ++i){
                    pagesArray.push(i);
                }
            }
        })
    }
    return (
        <div className={visible} onClick={props.handleClose}>
            <section className="fixed bg-white w-4/5 h-full overflow-auto max-h-192 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <button type="button" className="ml-2 mt-2" onClick={props.handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                {props.pages ? <Document
                    file={props.file} 
                    options={{ workerSrc: "/pdf.worker.js" }}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="w-3/5 mx-auto"
                >   
        {/* <Page pageNumber={pageNumber} className={`overflow-y-scroll w-4/5 h-192 mx-auto`} scale={1.6} /> */}
        {pagesArray.map((el, index) => {return <Page key={`page_${index+1}`} pageNumber={el} scale={2} />} )}
        {/* {Array.from(new Array(numberOfPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index +Number(props.pages && props.pages[props.ticket][0])} scale={2.5}/>
        ))} */}
                </Document> : null}

            </section>
        </div>
    )
}

export default Modal;