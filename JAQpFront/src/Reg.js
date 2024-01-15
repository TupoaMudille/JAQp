import './style/Reg.css';
import './style/Default.css';

function Reg() {
    return (
        <div className="elongated_app" style={{ backgroundImage: 'url(img/background.svg)' }}>
            <div className='empty_box'>
                <div className='elongated_box'>
                    <p className='h1'>Регистрация</p>
                </div>
                <div className='elongated_box'>
                    <div>
                        <p className='bold_text' style={{ float: 'left' }}>1.Почта</p>
                        <img className='icon' src='img/Checkmark_neutral.svg' style={{ float: 'right' }}></img>
                    </div>
                    <div className='evenly_distributed_field'>
                        <img className='icon' src='img/Mail.svg'></img>
                        <input className='customInput'></input>
                    </div>
                </div>
                <div className='elongated_box'>
                    <div>
                        <p className='bold_text' style={{ float: 'left' }}>2.Пароль</p>
                        <img className='icon' src='img/Checkmark_neutral.svg' style={{ float: 'right' }}></img>
                    </div>
                    <div className='evenly_distributed_field'>
                        <img className='icon' src='img/Password_Key.svg'></img>
                        <input className='customInput' type='password'></input>
                    </div>
                    <div className='evenly_distributed_field'>
                        <input className='customInput'type='password' style={{ marginLeft:'auto' }}></input></div>
                </div>
                <div className='button'>Зарегистрироваться</div>
            </div>
        </div>
    );
}

export default Reg;