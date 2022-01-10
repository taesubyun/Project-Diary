const Button = ({ text, type, onClick }) => {
    const btnType = ['positive', 'negative'].includes(type) ? type : 'default';
    // type값을 postive, negative로 가지지 않는 임의의 버튼이 생겨도 type:"default" 로 지정
    return (
        <button
            className={['button-form', ` button-form_${btnType}`].join('')}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

Button.defaultProps = { type: 'default' };
export default Button;
