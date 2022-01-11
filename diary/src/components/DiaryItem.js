const DiaryItem = ({ id, emotion, content, date }) => {
    // const env = process.env;
    // env.PUBLIC_URL = env.PUBLIC_ || '';
    return (
        <div className='DiaryItem'>
            <div
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
                <div className='info_wrapper'>
                    <div className='diary_date'></div>
                    <div className='diary_content_preview'></div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default DiaryItem;