const Progress = (props) => {
    return (
        <div className="ml-2">
            {props.done} / {props.total}
        </div>
    );
}

export default Progress;