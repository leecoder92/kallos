import { useCallback, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/modules";
import * as counterActions from "../../store/modules/counter";
import styled from "styled-components";

export default function Test() {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.counter.value);

  const plus = useCallback(() => {
    dispatch(counterActions.increment());
  }, [dispatch]);

  const minus = useCallback(() => {
    dispatch(counterActions.decrement());
  }, [dispatch]);

  return (
    <div>
      <h1>Counter</h1>
      <button onClick={() => minus()}>-</button>
      <span>{value}</span>
      <button onClick={() => plus()}>+</button>
    </div>
  );
}
