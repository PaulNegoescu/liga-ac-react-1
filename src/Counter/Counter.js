import { useState } from 'react';
import styles from './Counter.module.css';

export function Counter() {
  const [value, setValue] = useState(0);
  const myClass =
    value > 0 ? styles.positive : value < 0 ? styles.negative : '';

  return (
    <>
      <h2 className={myClass}>{value}</h2>
      <button onClick={() => setValue(value - 1)}>-</button>
      <button onClick={() => setValue(value + 1)}>+</button>
    </>
  );
}
