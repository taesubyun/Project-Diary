import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
//components
import Button from './components/Button';

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <h2>앱쩜제이에스</h2>
                {/* <img src={process.env.PUBLIC_URL + '/assets/emotion1.png'} /> */}
                {/* -  어떤 위치에 있던지 <Public 디렉토리> 경로를 가리킨다 + 이미지 소스  */}
                <Button
                    text={'버튼'}
                    onClick={() => {
                        alert('버튼 클릭');
                    }}
                    type={'positive'}
                />
                <Button
                    text={'버튼'}
                    onClick={() => {
                        alert('버튼 클릭');
                    }}
                    type={'negative'}
                />
                <Button
                    text={'버튼'}
                    onClick={() => {
                        alert('버튼 클릭');
                    }}
                />

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/new' element={<New />} />
                    <Route path='/edit' element={<Edit />} />
                    <Route path='/diary' element={<Diary />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
