import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { interestLists } from '../config/endpoints';
// accessor for the query client

/**
 * @description Makes a axios post call to the backend to create a new user list
 * @param {string} token - user token to make api calls
 * @returns {useMutation}
 */
export function useCreateNewUserList(token) {
  const queryClient = useQueryClient();
  return useMutation(
    (variables) =>
      axios
        .post(interestLists, variables.form, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => res.data),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['user-owned-lists']);
      },
    }
  );
}

// /**
//  * @description Makes a axios patch call to the backend to create a new user list
//  * @param {string} token - user token to make api calls
//  * @returns {useMutation}
//  */
// export function useUpdateUserList(token) {}

// /**
//  * @description Makes a axios get call to the backend to get the users lists
//  * @param {string} token - user token to make api calls
//  * @returns {useQuery}
//  */
// export function useGetUserLists(token) {}
