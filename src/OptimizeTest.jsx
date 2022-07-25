import { memo, useEffect, useState } from 'react';

function CounterA({ count }) {
  useEffect(() => {
    console.log(`CounterA update - count: ${count}`);
  });
  return <div>{count}</div>;
}

function CounterB({ obj }) {
  useEffect(() => {
    console.log(`CounterB update - count: ${obj.count}`);
  });
  return <div>{obj.count}</div>;
}

const areEqual = (prevProps, nextProps) => prevProps.obj.count === nextProps.obj.count;

const MemoizedCounterA = memo(CounterA);
const MemoizedCounterB = memo(CounterB, areEqual);

export default function OptimizeTest() {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{
      padding: 50,
    }}
    >
      <div>
        <h2>Counter A</h2>
        <MemoizedCounterA count={count} />
        <button type="button" onClick={() => setCount(count)}>A Button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button
          type="button"
          onClick={() => setObj({
            count: obj.count,
          })}
        >B Button
        </button>
      </div>
    </div>
  );
}
