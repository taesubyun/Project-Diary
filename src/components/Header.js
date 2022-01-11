const Header = ({ leftChild, headText, rightChild }) => {
    return (
        <header>
            <div className='head-btn-left'>{leftChild}</div>
            <div className='head-text'>{headText}</div>
            <div className='head-btn-right'>{rightChild}</div>
        </header>
    );
};

export default Header;
