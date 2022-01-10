import { useNavigate } from 'react-router-dom';

const Diary = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Diary</h1>
            <p>이곳은 일기 상세 페이지 입니다.</p>
            <button
                onClick={() => {
                    navigate('/');
                }}
            >
                홈으로 가기
            </button>
            {/* 개꿀 뒤로가기 */}
            <button
                onClick={() => {
                    navigate(-1);
                }}
            >
                뒤로 가기
            </button>
        </div>
    );
};

export default Diary;
