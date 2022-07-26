import { useContext } from 'react';

import DiaryItem from './DiaryItem';

// eslint-disable-next-line import/no-cycle
import { DiaryDispatchContext, DiaryStateContext } from './App';

export default function DiaryList() {
  const diaryList = useContext(DiaryStateContext);

  const { onEdit, onRemove } = useContext(DiaryDispatchContext);

  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {
          diaryList.map((item) => (
            <DiaryItem onEdit={onEdit} onRemove={onRemove} key={item.id} item={item} />
          ))
        }
      </div>
    </div>
  );
}
