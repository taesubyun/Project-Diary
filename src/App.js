import { useRef, useReducer } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import { useEffect } from 'react/cjs/react.development';

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
    localStorage.setItem('diary', JSON.stringify(newState));
    return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

// const dummyData = [
//     {
//         id: 1,
//         emotion: 1,
//         content: '오늘의 일기 1번',
//         date: 1641881641075,
//     },
//     {
//         id: 2,
//         emotion: 2,
//         content: '오늘의 일기 2번',
//         date: 1641881641076,
//     },
//     {
//         id: 3,
//         emotion: 3,
//         content: '오늘의 일기 3번',
//         date: 1641881641077,
//     },
//     {
//         id: 4,
//         emotion: 4,
//         content: '오늘의 일기 4번',
//         date: 1641881641078,
//     },
//     {
//         id: 5,
//         emotion: 5,
//         content: '오늘의 일기 5번',
//         date: 1641881641079,
//     },
// ];

function App() {
    // WEB STORAGE API_LOCALSTORAGE
    useEffect(() => {
        // localStorage.setItem('item1', 10);
        // localStorage.setItem('item2', '20');
        // localStorage.setItem('item3', JSON.stringify({ value: 30 }));
        // JSON.stringify라는 메소드를 통해 직렬화 - 객체를 문자열형으로 바꿔줌

        const item1 = localStorage.getItem('item1');
        const item2 = localStorage.getItem('item2');
        const item3 = JSON.parse(localStorage.getItem('item3'));
        console.log({ item1, item2, item3 });
    }, []);

    useEffect(() => {
        const localData = localStorage.getItem('diary');
        if (localData) {
            const diaryList = JSON.parse(localData).sort(
                (a, b) => parseInt(b.id) - parseInt(a.id)
            );
            dataId.current = diaryList[0].id + 1;
            dispatch = { type: 'INT', data: diaryList };
        }
    }, []);
    const [data, dispatch] = useReducer(reducer, []);

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
                            <Route path='/edit/:id' element={<Edit />} />
                            <Route path='/diary/:id' element={<Diary />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
}

export default App;
