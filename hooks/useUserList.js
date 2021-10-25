import { interestLists } from '../config/endpoints';
import { useQuery } from "react-query";
import axios from "axios";

const getUserList = (id) => {
  return ()=>axios.get(interestLists + id).then((res) => res.data);
};

export default function useUserList(id) {
  return useQuery(['user-list', id], getUserList(id), {});
}
