import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from './../App';
import { useEffect, useContext, useRef, useState } from 'react';
import Header from './Header';
import Button from './Button';
import EmotionItem from './EmotionItem';

import { getStringDate } from '../utils/date.js';

const emotionList = [
    {
        emotion_id: 1,
        emotion_descript: '완전 좋음',
        emotion_img: process.env.PUBLIC_URL + 'assets/emotion1.png',
    },
    {
        emotion_id: 2,
        emotion_img: process.env.PUBLIC_URL + 'assets/emotion2.png',
        emotion_descript: '좋음',
    },
    {
        emotion_id: 3,
        emotion_img: process.env.PUBLIC_URL + 'assets/emotion3.png',
        emotion_descript: '보통',
    },
    {
        emotion_id: 4,
        emotion_img: process.env.PUBLIC_URL + 'assets/emotion4.png',
        emotion_descript: '나쁨',
    },
    {
        emotion_id: 5,
        emotion_img: process.env.PUBLIC_URL + 'assets/emotion5.png',
        emotion_descript: '완전 나쁨',
    },
];

const DiaryEditor = ({ isEdit, originData }) => {
    const contentRef = useRef();
    const [content, setContent] = useState('');
    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));
    const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
    const handleClickEmote = (emotion) => {
        setEmotion(emotion);
    };

    const navigate = useNavigate();

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.content.focus();
            return;
        }

        if (
            window.confirm(
                isEdit
                    ? '일기를 수정하시겠습니까?'
                    : '새로운 일기를 작성하시겠습니까?'
            )
        ) {
            if (!isEdit) {
                onCreate(date, content, emotion);
            } else {
                onEdit(originData.id, date, content, emotion);
            }
        }

        navigate('/', { replace: true });
    };

    const handleRemove = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            onRemove(originData.id);
            navigate('/', { replace: true });
        }
    };
    useEffect(() => {
        if (isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData]);
    return (
        <div className='DiaryEditor'>
            <Header
                headText={isEdit ? '일기 수정하기' : '새 일기 쓰기'}
                leftChild={
                    <Button text={'< 뒤로'} onClick={() => navigate(-1)} />
                }
                rightChild={
                    isEdit && (
                        <Button
                            text={'삭제하기'}
                            type={'negative'}
                            onClick={handleRemove}
                        ></Button>
                    )
                }
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className='input_box'>
                        <input
                            className='input_date'
                            value={date}
                            type='date'
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className='input_box emotion_list_wrapper'>
                        {emotionList.map((it) => (
                            <EmotionItem
                                key={it.emotion_id}
                                {...it}
                                onClick={handleClickEmote}
                                isSelected={it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className='input_box text_wrapper'>
                        <textarea
                            placeholder='오늘은 어땠나요?'
                            ref={contentRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <div className='control_box'>
                        <Button
                            text={'취소하기'}
                            onClick={() => navigate(-1)}
                        />
                        <Button
                            text={'작성 완료'}
                            type={'positive'}
                            onClick={handleSubmit}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;
