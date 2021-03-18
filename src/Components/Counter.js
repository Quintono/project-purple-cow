import React, { useState, useEffect } from "react";
import styles from "./Counter.module.css";

const NAMESPACE = "q-purple-cow";
const KEY = "1ccb732e-b55a-4404-ad3f-0f99c02fe44e";

const counterApiRoute = "https://api.countapi.xyz";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCounter();
  }, []);

  // get initial count
  async function getCounter() {
    setIsLoading(true);
    const res = await fetch(`${counterApiRoute}/get/${NAMESPACE}/${KEY}`);
    const data = await res.json();

    setIsLoading(false);
    setCount(data.value);
  }

  async function hitCounter() {
    setIsLoading(true);
    const res = await fetch(`${counterApiRoute}/hit/${NAMESPACE}/${KEY}`);
    const data = await res.json();

    setIsLoading(false);
    setCount(data.value);
  }

  return (
    <div className={styles.counter}>
      {isLoading ? (
        <div className={styles.loading} data-testid="loading-element">
          Loading...
        </div>
      ) : (
        <h1 className={styles.count} data-testid="count-element">
          {count}
        </h1>
      )}
      <button className={styles.button} onClick={() => hitCounter()}>
        Count Purple Cows
      </button>
    </div>
  );
};

export default Counter;
