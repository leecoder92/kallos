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
    getUser: (obj) => dispatch(fetchUser(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);

function Test({ value, users, plus, minus, getUser }) {
  const [people, setPeople] = useState([]);
  const params = {
    user: "users",
  };

  //   useEffect(() => {
  //     getUser(params);
  //     // setPeople(users);
  //   }, []);

  useEffect(() => {
    setPeople(users);
  }, [users]);

  const onClickFunc = () => {
    getUser(params);
  };
  return (
    <div style={{ marginTop: "50px" }} className="container">
      <h1>Counter</h1>
      <button onClick={() => minus()}>-</button>
      <span>{value}</span>
      <button onClick={() => plus()}>+</button>
      <button onClick={onClickFunc}>get</button>
      <button onClick={() => minus()}>reset</button>
      <div>
        {people && people.map((person) => <p key={person.id}>{person.name}</p>)}
      </div>
      <div className="footer">wer</div>
      <style jsx>
        {`
          .container {
            position: relative;
            height: 100vh;
          }
          .footer {
            width: 100vw;
            height: 200px;
            position: absolute;
            background-color: #f9e6e1;
            bottom: 0;
            left: 0
          }
        `}
      </style>
    </div>
  );
}
