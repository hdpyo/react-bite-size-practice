import {
  memo, useEffect, useRef, useState,
} from 'react';

function DiaryItem({
  item: {
    id, author, content, createdDate, emotion,
  },
  onEdit,
  onRemove,
}) {
  useEffect(() => {
    console.log(`${id} 번째 아이템 렌더`);
  }, []);

  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(content);

  const toggleIsEdit = () => setIsEdit(!isEdit);

  const localContentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleChangeLocalContent = (e) => {
    setLocalContent(e.target.value);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>작성자 : {author} | 감정 : {emotion}</span>
        <br />
        <span className="date">{new Date(createdDate).toLocaleString()}</span>
      </div>
      <div className="content">
        {
          isEdit
            ? (
              <textarea
                ref={localContentInput}
                onChange={handleChangeLocalContent}
              >
                {localContent}
              </textarea>
            )
            : <p>{ content }</p>
        }
      </div>
      {
      isEdit
        ? (
          <>
            <button type="button" onClick={handleQuitEdit}>수정 취소</button>
            <button type="button" onClick={handleEdit}>수정 완료</button>
          </>
        )
        : (
          <>
            <button type="button" onClick={handleRemove}>삭제하기</button>
            <button type="button" onClick={toggleIsEdit}>수정하기</button>
          </>
        )
      }
    </div>
  );
}

export default memo(DiaryItem);
