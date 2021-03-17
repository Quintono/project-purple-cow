import React, { useState, useEffect } from "react";

const NAMESPACE = "q-purple-cow";
const KEY = "1ccb732e-b55a-4404-ad3f-0f99c02fe44e";

const counterApiRoute = "https://api.countapi.xyz";

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getCounter();
  }, []);

  // get initial count
  async function getCounter() {
    const res = await fetch(`${counterApiRoute}/get/${NAMESPACE}/${KEY}`);
    const data = await res.json();

    setCount(data.value);
  }

  async function hitCounter() {
    const res = await fetch(`${counterApiRoute}/hit/${NAMESPACE}/${KEY}`);
    const data = await res.json();

    setCount(data.value);
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => hitCounter()}>Count Purple Cows!</button>
    </div>
  );
};

export default Counter;
