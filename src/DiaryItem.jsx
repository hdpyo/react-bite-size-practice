export default function DiaryItem({
  item: {
    author, content, createdDate, emotion,
  },
}) {
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>작성자 : {author} | 감정 : {emotion}</span>
        <br />
        <span className="date">{new Date(createdDate).toLocaleString()}</span>
      </div>
      <div className="content">{content}</div>
    </div>
  );
}
