import { useCallback, FC, useState } from "react";
import { RootState } from "../../store/modules";
import { connect } from "react-redux";
import { mintAnimalTokenContract } from "contracts";
import { increment, decrement } from "../../store/modules/counter";
import styled from "styled-components";
import AnimalCard from "@/components/AnimalCard";

export interface TestProps {
  value: number;
  setPlus: any;
  setMinus: any;
  account: string;
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

const Test: FC<TestProps> = ({ value, setPlus, setMinus, account }) => {
  const [num, setNum] = useState(value);

  const plus = () => {
    setPlus();
    setNum((prev: number) => prev + 1);
  };
  const minus = () => {
    setMinus();
    setNum((prev: number) => prev - 1);
  };
  // ===========================================
  const [newAnimalType, setNewAnimalType] = useState<string>();
  const onClickMint = async () => {
    try {
      if (!account) return;

      const response = await mintAnimalTokenContract.methods
        .mintAnimalToken()
        .send({
          from: account,
        });

      if (response.status) {
        const balanceLength = await mintAnimalTokenContract.methods
          .balanceOf(account)
          .call();

        const animalTokenId = await mintAnimalTokenContract.methods
          .tokenOfOwnerByIndex(account, parseInt(balanceLength, 10) - 1)
          .call();

        const animalType = await mintAnimalTokenContract.methods
          .animalTypes(animalTokenId)
          .call();

        setNewAnimalType(animalType);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Counter</h1>
      <button onClick={() => minus()}>-</button>
      <span>{num}</span>
      <button onClick={() => plus()}>+</button>
      <div>
        {newAnimalType ? (
          <AnimalCard animalType={newAnimalType} />
        ) : (
          <p>Let us mint Animal Card!!</p>
        )}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
