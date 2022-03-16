import { connect } from "react-redux";
import { testAction } from "../store/actions/testAction";
import { useEffect, useState } from "react";

const mapStateToProps = (state: any) => {
  return {
    data: state.testReducer.data,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setData: (num: any) => dispatch(testAction(num)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);

function Test({ data, setData }) {
  const [newData, setNewData] = useState(data);
  //1
  const handleChange = (event: any) => {
    setData(event.target.value);
    setNewData(event.target.value);
  };

  //3
  //   useEffect(() => {
  //   }, [data]);

  //2
  return (
    <div>
      testPage다!
      <span>{newData}</span>
      <input type="text" onChange={handleChange} />
      <style jsx>{
          `
          div{
              display:flex;
          }
          span{
              font-size:30px
          }
          `
                }</style>
    </div>
  );
}
