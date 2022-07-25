import './App.css';

import { useEffect, useRef, useState } from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// https://jsonplaceholder.typicode.com/comments

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(1);

  const getData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments')
      .then((res) => res.json());
    console.log(response);

    const initData = response.slice(0, 20).map((item) => ({
      author: item.email,
      content: item.body,
      emotion: Math.floor(Math.random() * 5) + 1,
      createdDate: new Date().getTime(),
      // eslint-disable-next-line no-plusplus
      id: dataId.current++,
    }));

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    const createdDate = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      createdDate,
      id: dataId.current,
    };

    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    alert(`${targetId}번째 일기가 삭제되었습니다.`);
    const newDiaryList = data.filter((item) => item.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map(
        (item) => (item.id === targetId ? { ...item, content: newContent } : item),
      ),
    );
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default App;
