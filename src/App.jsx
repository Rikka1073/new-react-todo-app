import { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import { getAllTodo } from "../utils/supabaseFunction";

function App() {
  const [studyText, setStudyText] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [record, setRecord] = useState([]);
  const [error, setError] = useState([]);
  const [time, setTime] = useState([]);
  const [todos, setTodos] = useState([]);

  const onChangeText = (event) => {
    setStudyText(event.target.value);
  };

  const onChangeTime = (event) => {
    setStudyTime(event.target.value);
  };

  const onClickAddTodo = () => {
    if (studyText === "" || studyTime === "") {
      const errorword = "入力されていない項目があります";
      !error.includes(errorword) && setError([...error, errorword]);
      return;
    } else {
      const newRecord = { title: studyText, time: parseInt(studyTime) };
      const newRecords = [...record, newRecord];
      const sumTim = [...time, newRecord.time];
      setRecord(newRecords);
      setStudyText("");
      setStudyTime("");
      setError([]);
      setTime(sumTim);
    }
  };

  const totalTime = time.reduce((totalTime, currentTime) => {
    return totalTime + currentTime;
  }, 0);

  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAllTodo();
      setTodos(todos);
      console.log(todos);
    };
    getTodos();
  }, []);

  return (
    <SContainer>
      <STitle>学習記録一覧</STitle>
      <div>
        学習内容
        <SInput type="text" onChange={onChangeText} value={studyText} />
      </div>
      <div>
        学習時間
        <SInput type="text" onChange={onChangeTime} value={studyTime} />
        時間
      </div>
      <div>
        <p>入力されている学習内容 {studyText}</p>
      </div>
      <div>
        <p>入力されている時間 {studyTime}時間</p>
      </div>
      <SLogArea>
        {record.map((record, index) => {
          return (
            <div className="" key={index}>
              <p>
                {record.title} {record.time}時間
              </p>
            </div>
          );
        })}
      </SLogArea>
      <div>
        <div></div>
      </div>
      <SButton onClick={onClickAddTodo}>登録</SButton>
      <div>
        <SErroText>{error}</SErroText>
      </div>
      <div>
        <p>合計時間:{totalTime}/1000（h）</p>
      </div>
    </SContainer>
  );
}

const SContainer = styled.div`
  text-align: left;
  width: 600px;
  margin: 0 auto;
  background-color: aquamarine;
  padding: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const STitle = styled.h1`
  text-align: center;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 32px;
`;

const SButton = styled.button`
  background-color: #fff;
  outline: none;
  border-radius: 100px;
  padding: 10px 40px;
  border: 1px solid;
`;

const SInput = styled.input`
  margin-left: 20px;
`;

const SLogArea = styled.div`
  background-color: #fff;
  border-radius: 100px;
  padding: 10px;
  width: 300px;
  margin-bottom: 20px;
`;

const SErroText = styled.p`
  color: #ff0000;
  font-weight: bold;
`;

export default App;
