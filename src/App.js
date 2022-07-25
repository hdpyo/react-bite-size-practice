import './App.css';

import { useRef, useState } from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList = [
  // {
  //   id: 1,
  //   author: '이정환',
  //   content: 'Hi 1',
  //   emotion: 5,
  //   createdDate: new Date().getTime(),
  // },
  // {
  //   id: 2,
  //   author: '홍길동',
  //   content: 'Hi 2',
  //   emotion: 4,
  //   createdDate: new Date().getTime(),
  // },
  // {
  //   id: 3,
  //   author: '허균',
  //   content: 'Hi 3',
  //   emotion: 3,
  //   createdDate: new Date().getTime(),
  // },
];

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

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

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} />
    </div>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default App;
