import { useNavigate } from "react-router-dom";
import '../css/longmenu.css';
function LongMenu() {
    const navigate = useNavigate();
    const gotoUserSettingsPage = () => navigate("/userSettingsId=?");
    return (
        
            <div className="header_container">
                <div className="block">
                    <div className="evenly_distributed_block">
                        <img className='button_icon_small' src='img/Search.svg'></img>
                    </div>
                    <div className="evenly_distributed_block">
                        <p className='logo_name'>JAQp</p>
                        <p className='logo_text'>Just Another Quiez platform</p>
                    </div>
                    <div className="evenly_distributed_block">
                        <img className='button_icon' src='img/Dice.svg'></img>
                        <p className='text'>Тесты</p>
                        <p className='text'>Лучшее</p>
                        <img className='button_icon' src='img/Search.svg'></img>
                    </div>
                    <div className="evenly_distributed_block">
                        <img className='button_icon' src='img/Telegram.svg'></img>
                        <img className='button_icon' src='img/twitter.svg'></img>
                        <img className='button_icon' src='img/whatsapp.svg'></img>
                        <img className='button_icon' src='img/vk.svg'></img>
                    </div>
                    <div className="user_block" onClick={gotoUserSettingsPage}>
                        <img src='img/User_Empty_icon.svg' className='icon'></img>
                        <p className='simple_text'>UserName</p>
                    </div>
                    <img className='button_icon_small' src='img/Menu.svg'></img>
                </div>
            </div>
      
    );
}

export default LongMenu;