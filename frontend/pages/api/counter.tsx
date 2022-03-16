import { useCallback, FC, useState } from "react";
import { RootState } from "../../store/modules";
import { connect } from "react-redux";
import { increment, decrement } from "../../store/modules/counter";
import styled from "styled-components";

export interface TestProps{
    value: number;
    setPlus: any;
    setMinus: any;
}

const mapStateToProps = (state: RootState) => {
  return {
    value: state.counterReducer.value,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setPlus: () => dispatch(increment()),
    setMinus: () => dispatch(decrement()),
  };
};

const Test: FC<TestProps> = ({ value, setPlus, setMinus }) => {
  const [num, setNum] = useState(value);

  const plus = () => {
    setPlus();
    setNum((prev: number) => prev + 1);
  };
  const minus = () => {
    setMinus();
    setNum((prev: number) => prev - 1);
  };

  return (
    <div>
      <h1>Counter</h1>
      <button onClick={() => minus()}>-</button>
      <span>{num}</span>
      <button onClick={() => plus()}>+</button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);