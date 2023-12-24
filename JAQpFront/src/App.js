import './style/App.css';
import './style/Default.css';


function App() {
  const Reg = () => {
    window.location.href = "/registration"
  };
  const Main = () => {
    window.location.href = "/main"
  };
  return (
    <div className="centered_app" style={{ backgroundImage: 'url(img/background.svg)' }}>
      
        <div className='compressed_box' >
          <div>
            <p className='h1'>JAQp</p>
            <p className='h2'>Авторизация</p>
          </div>
          <div className='compressed_box'>
            <div className='evenly_distributed_field '>
              <img className='icon' src='img/Male_User.svg'></img>
              <input className='customInput'></input>
            </div>
            <div className='evenly_distributed_field '>
              <img className='icon' src='img/Password_Key.svg'></img>
              <input className='customInput' type='password'></input>
            </div>
            <div className='evenly_distributed_field '>

              <button className='textButton' onClick={Reg} >Регистрация</button>
              <button className='textButton'>Забыли пароль?</button>
            </div>
          </div>
          <button className='center_primary_button' onClick={Main}>Войти</button>
        </div>
      </div>
      );
}

      export default App;

