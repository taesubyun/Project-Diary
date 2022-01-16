import { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import { DiaryStateContext } from '../App';
import { getStringDate } from '../utils/date';
import Header from './../components/Header';
import Button from './../components/Button';

const Diary = () => {
    const { id } = useParams();
    const diaryList = useContext(DiaryStateContext);
    const [data, setData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );
            if (targetDiary) {
                setData(targetDiary);
            } else {
                alert('없는 일기입니다');
                navigate('/', { replace: true });
            }
        }
    }, [id, diaryList]);
    if (!data) {
        return <div className='DiaryPage'>로딩 중입니다</div>;
    } else {
        return (
            <div className='DiaryPage'>
                <Header
                    headText={`${getStringDate(new Date(data.date))} 기록`}
                    leftChild={
                        <Button text={'< 뒤로'} onClick={() => navigate(-1)} />
                    }
                    rightChild={
                        <Button
                            text={'수정'}
                            onClick={() => navigate(`/edit/${data.id}`)}
                        />
                    }
                />
            </div>
        );
    }
};
export default Diary;
// import { useNavigate } from 'react-router-dom';

// const Diary = () => {
//     const navigate = useNavigate();
//     return (
//         <div>
//             <h1>Diary</h1>
//             <p>이곳은 일기 상세 페이지 입니다.</p>
//             <button
//                 onClick={() => {
//                     navigate('/');
//                 }}
//             >
//                 홈으로 가기
//             </button>
//             {/* Tip :: 뒤로가기 */}
//             <button
//                 onClick={() => {
//                     navigate(-1);
//                 }}
//             >
//                 뒤로 가기
//             </button>
//         </div>
//     );
// };

// export default Diary;
