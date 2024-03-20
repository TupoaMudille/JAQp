
import './style/userSettings.css';
import DatePicker from "react-datepicker";
import React, { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import InfoCard from "./components/InfoCard";

function UserSettings() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className="App" style={{ backgroundImage: 'url(img/background.svg)' }}>
            
            
                <div className="elongated_body">
                    <div className="card">
                    <div className='text_card'>
                    <div className='text_block'>
                                <p className='h1'>Управление аккаунтом</p>
                            </div>
                    </div>
                    </div>
                    <div className="card">
                        <div className='text_card'>
                            <div className='text_block'>
                                <p className='h2'>Изменение личной информации</p>
                            </div>
                        </div>
                        <div><InfoCard text={"Имя"} icon={"img/info.svg"} /></div>
                        <div><InfoCard text={"Фамилия"} icon={"img/info.svg"} /></div>
                        <div><InfoCard text={"Отчество"} icon={"img/info.svg"} /></div>
                        <div className="elongated_card">
                            <div>
                                <p className='bold_text' style={{ float: 'left' }}>День рождения</p>
                            </div>
                            <div className='evenly_distributed_field'>
                                <img className='icon' src='img/birthday.svg'></img>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='customDateInput' />
                            </div>

                        </div>
                        <div className="empty_elongated_card">
                        <button className='button'>Сохранить</button>
                        </div>
                        
                    </div>

                    <div className="card">
                        <div className='text_card'>
                            <div className='text_block'>
                                <p className='h2'>Выход из аккаунта</p>
                            </div>

                        </div>
                        <div className="empty_elongated_card">
                        
                        <div className='textButtonBorder'>
                        <img className='delIcon' src='img/Exit.svg'></img>
                        <div className="delText">Выйти</div>
                            
                            </div>
                        </div>

                       
                        
                    </div>

                    <div className="card">
                        <div className='text_card'>
                            <div className='text_block'>
                                <p className='h2' style={{ color: 'red' }}>Удаление аккаунта</p>
                            </div>

                        </div>
                        <div className="elongated_card">

                            <div className="delBlock">
                                <img className='delIcon' src='img/trashCan.svg'></img>
                                <div className="delText" style={{color:'red'}}>Удалить аккаунт</div>
                            </div>
                        </div>
                    </div>
                </div>
            
        </div>
    );
}

export default UserSettings;