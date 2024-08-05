import { supabase } from "../utils/supabase";

export const getAllTodo = async () => {
  const todos = await supabase.from("study-record").select("*");
  return todos.data;
};

export const addTodo = async (studyText, studyTime) => {
  await supabase.from("study-record").insert({ title: studyText, time: studyTime }).select();
};

export const deleteTodo = async (id) => {
  console.log(id);
  await supabase.from("study-record").delete().eq("id", id);
};
