import React, { useRef, useReducer } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
//components
// import Button from './components/Button';
// import Header from './components/Header';

const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'INT': {
            return action.data;
        }
        case 'CREATE': {
            const newItem = {
                ...action.data,
            };
            newState = [action.data, ...state];
            break;
        }
        case 'REMOVE': {
            newState = state.filter((it) => it.id !== action.targetId);
            break;
        }
        case 'EDIT': {
            newState = state.map((it) =>
                it.id === action.data.id ? { ...action.data } : it
            );
            break;
        }
        default:
            return state;
    }
    return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
    {
        id: 1,
        emotion: 1,
        content: '오늘의 일기 1번',
        date: 1641881641075,
    },
    {
        id: 2,
        emotion: 2,
        content: '오늘의 일기 2번',
        date: 1641881641076,
    },
    {
        id: 3,
        emotion: 3,
        content: '오늘의 일기 3번',
        date: 1641881641077,
    },
    {
        id: 4,
        emotion: 4,
        content: '오늘의 일기 4번',
        date: 1641881641078,
    },
    {
        id: 5,
        emotion: 5,
        content: '오늘의 일기 5번',
        date: 1641881641079,
    },
];

function App() {
    const [data, dispatch] = useReducer(reducer, dummyData);

    const dataId = useRef(0);
    const onCreate = (date, content, emotion) => {
        dispatch({
            type: 'CREATE',
            data: {
                id: dataId.current,
                date: new Date(date).getTime(),
                content,
                emotion,
            },
        });
        dataId.current += 1;
    };
    const onRemove = (targetId) => {
        dispatch({ type: 'REMOVE', targetId });
    };
    const onEdit = (targetId, date, content, emotion) => {
        dispatch({
            type: 'EDIT',
            data: {
                id: targetId,
                date: new Date(date).getTime(),
                content,
                emotion,
            },
        });
    };

    return (
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider value={(onCreate, onEdit, onRemove)}>
                <BrowserRouter>
                    <div className='App'>
                        {/* <Header
                    headText={'앱'}
                    📍 컴포넌트 자체를 Props로 전달하기
                    leftChild={
                        <Button
                            text={'왼쪽 버튼'}
                            onClick={() => alert('왼쪽 클릭')}
                        />
                    }
                    rightChild={
                        <Button
                            text={'오른쪽 버튼'}
                            onClick={() => alert('오른쪽 클릭')}
                        />
                    }
                />
                <h2>앱쩜제이에스</h2> */}
                        {/* <img src={process.env.PUBLIC_URL + '/assets/emotion1.png'} /> */}
                        {/* -  어떤 위치에 있던지 <Public 디렉토리> 경로를 가리킨다 + 이미지 소스  */}
                        {/* <Button
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
                /> */}

                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/new' element={<New />} />
                            <Route path='/edit' element={<Edit />} />
                            <Route path='/diary' element={<Diary />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
}

export default App;
