import { Link } from 'react-router-dom';

const RouteTest = () => {
    return (
        <>
            <Link to={'/'}>HOME</Link>
            <br />
            <Link to={'/diary'}>NEW</Link>
            <br />
            <Link to={'/new'}>DIARY</Link>
            <br />
            <Link to={'/edit'}>EDIT</Link>
            <br />
        </>
    );
};

export default RouteTest;
