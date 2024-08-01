import { supabase } from "../utils/supabase";

export const getAllTodo = async () => {
  const todos = await supabase.from("study-record").select("*");
  return todos.data;
};
