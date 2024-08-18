import { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import { getAllTodo } from "../utils/supabaseFunction";
import { addTodo } from "../utils/supabaseFunction";
import { deleteTodo } from "../utils/supabaseFunction";

function App() {
  const [studyText, setStudyText] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [record, setRecord] = useState([]);
  const [error, setError] = useState([]);
  const [time, setTime] = useState([]);
  const [loading, setLoading] = useState(true);

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
      addTodo(studyText, studyTime);
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
    const getRecord = async () => {
      const record = await getAllTodo();
      // console.log("Fetched record:", record);
      setRecord(record);
      const recordTime = record.map((item) => {
        return item.time;
      });
      setLoading(false);
      setTime(recordTime);
    };
    getRecord();
  }, []);

  const onClickDeleteTodo = async (id) => {
    await deleteTodo(id);
    const record = await getAllTodo();
    setRecord(record);
  };

  return (
    <SContainer>
      <title data-testid="title">Hello Jest</title>
      <STitle data-testid="main-title">学習記録一覧</STitle>
      <div>
        <label htmlFor="studyText">学習内容</label>
        <SInput id="studyText" type="text" onChange={onChangeText} value={studyText} />
      </div>
      <div>
        <label htmlFor="studyTime">学習時間</label>
        <SInput id="studyTime" type="text" onChange={onChangeTime} value={studyTime} />
        時間
      </div>
      <div>
        <p>入力されている学習内容 {studyText}</p>
      </div>
      <div>
        <p>入力されている時間 {studyTime}時間</p>
      </div>
      <SLogArea>
        <div>{loading ? <p>ロード中</p> : <p>データを取得しました</p>}</div>
        {record.map((record, index) => {
          return (
            <SrecordArea key={record.id} data-testid={`record-box-${index}`} className="record-box">
              <div data-testid="record-box">
                <p data-testid={`record-text-${index}`}>
                  {record.title} {record.time}時間
                </p>
              </div>
              <button
                onClick={() => {
                  onClickDeleteTodo(record.id);
                }}
                className="delete-button"
                role="button"
                data-testid={`delete-button-${index}`}
              >
                削除
              </button>
            </SrecordArea>
          );
        })}
      </SLogArea>
      <div>
        <div></div>
      </div>
      <SButton onClick={onClickAddTodo} data-testid="add-button">
        登録
      </SButton>
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
  max-width: 600px;
  margin: 0 auto;
  background-color: #29e68e;
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

const SSubTitle = styled.h2`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 20px;
  title {
    display: block;
  }
`;

const SButton = styled.button`
  background-color: #fff;
  outline: none;
  border-radius: 100px;
  padding: 10px 40px;
  border: 0px solid;
`;

const SInput = styled.input`
  margin-left: 20px;
`;

const SLogArea = styled.div`
  background-color: #fff;
  padding: 10px;
  width: 300px;
  margin-bottom: 20px;
`;

const SErroText = styled.p`
  color: #ff0000;
  font-weight: bold;
`;

const SrecordArea = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  align-items: center;
  padding: 20px 0;
  background-color: #c4fdea;
  border-radius: 999px;
  p {
    margin: 0;
  }
  button {
    background-color: #fff;
    outline: none;
    border: 0px solid;
    border-radius: 100px;
    padding: 10px 20px;
  }
  button:hover {
    background-color: #fe6a6a;
    color: #fff;
  }
`;

export default App;
