import './App.css';

import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

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

  const getDiaryAnalysis = useMemo(() => {
    console.log('일기 분석 시작');
    const goodCount = data.filter((item) => item.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {
      goodCount,
      badCount,
      goodRatio,
    };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기: {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default App;
