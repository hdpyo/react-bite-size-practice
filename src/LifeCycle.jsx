import { useEffect, useState } from 'react';

export default function LifeCycle() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('Mount');
  }, []);

  useEffect(() => {
    console.log('update!');
  });

  useEffect(() => {
    console.log(`count is update: ${count}`);
    if (count > 5) {
      alert('count 가 5를 넘었습니다. 따라서 1로 초기화합니다.');
      setCount(1);
    }
  }, [count]);

  useEffect(() => {
    console.log(`text is update: ${text}`);
  }, [text]);

  // useEffect 에서 함수를 return 하면 Unmount 된다.
  useEffect(() => () => {
    console.log('Unmount!');
  }, []);

  return (
    <div style={{
      padding: '20px',
    }}
    >
      <h2>LifeCycle</h2>
      <div>
        {count}
        <button type="button" onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      </div>

    </div>
  );
}
