import DiaryEditor from '../components/DiaryEditor';
import { useState, useContext, useEffect } from 'react';
import { DiaryStateContext } from '../App.js';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const [originData, setOriginData] = useState();
    const navigate = useNavigate();
    const diaryList = useContext(DiaryStateContext);
    const { id } = useParams();

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );
            console.log(targetDiary);
            if (targetDiary) {
                setOriginData(targetDiary);
            } else {
                alert('없는 일기입니다');
                navigate('/', { replce: true });
            }
        }
    }, [id, diaryList]);
    return (
        <div>
            {originData && (
                <DiaryEditor isEdit={true} originData={originData} />
            )}
            Edit2
        </div>
    );
};

export default Edit;
