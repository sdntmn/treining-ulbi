import { useState } from "react";
import cls from "./Counter.module.scss";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div className={cls.btn}>
      <h1>{count}</h1>
      <button className={cls.btn__title} onClick={increment}>
        increment
      </button>
    </div>
  );
};

export default Counter;
