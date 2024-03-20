function InfoCard({text, icon}) {
    return (
        <div className="elongated_card">
                        <div>
                            <p className='bold_text' style={{ float: 'left' }}>{text}</p>
                        </div>
                        <div className='evenly_distributed_field'>
                            <img className='icon' src={icon}></img>
                            <input className='customInput' />
                        </div>
                    </div>
    );
}

export default InfoCard;