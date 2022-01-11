import { useNavigate } from 'react-router-dom';
import Button from './../components/Button';
const DiaryItem = ({ id, emotion, content, date }) => {
    const strDate = new Date(parseInt(date)).toLocaleDateString();
    const navigate = useNavigate();

    const goDetail = () => {
        navigate(`/diary`);
    };
    const goEdit = () => {
        navigate(`/edit`);
    };

    return (
        <div className='DiaryItem'>
            <div
                onClick={goDetail}
                className={[
                    'emotion_img_wrapper',
                    ` emotion_img_wrapper_${emotion}`,
                ].join('')}
            >
                <img
                    src={
                        process.env.PUBLIC_URL + `assets/emotion${emotion}.png`
                    }
                ></img>
            </div>
            <div onClick={goDetail} className='info_wrapper'>
                <div className='diary_date'>{strDate}</div>
                <div className='diary_content_preview'>
                    {content.slice(0.25)}
                </div>
            </div>
            <div className='btn_wrapper'>
                <Button onClick={goEdit} text={'수정하기'} />
            </div>
        </div>
    );
};

export default DiaryItem;
