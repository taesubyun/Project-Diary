const DiaryList = ({ diaryList }) => {
    return (
        <div>
            {diaryList.map((it) => (
                <div key={it.id}>{it.content}</div>
            ))}
        </div>
    );
};

DiaryList.defaulProps = {
    diaryList: [],
};
export default DiaryList;
