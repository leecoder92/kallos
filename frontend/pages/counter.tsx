import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { increment, decrement, fetchUser } from "../store/modules/counter";

const mapStateToProps = (state) => {
  return {
    value: state.counterReducer.value,
    users: state.counterReducer.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    plus: () => dispatch(increment()),
    minus: () => dispatch(decrement()),
    getUser: (str) => dispatch(fetchUser(str)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);

function Test({ value, users, plus, minus, getUser }) {
  const [people, setPeople] = useState([]);
  const params = {
    user: "users",
  };

  const getUserFunc = () => {
};
useEffect(() => {
      getUser(params);
    // setPeople(users);
  }, []);
  useEffect(() => {
    setPeople(users);
  }, [users]);

  return (
    <div>
      <h1>Counter</h1>
      <button onClick={() => minus()}>-</button>
      <span>{value}</span>
      <button onClick={() => plus()}>+</button>
      <button onClick={getUserFunc}>getUser</button>
      <button onClick={() => minus()}>reset</button>
      <div>
        {people && people.map((person) => <p key={person.id}>{person.name}</p>)}
      </div>
    </div>
  );
}
