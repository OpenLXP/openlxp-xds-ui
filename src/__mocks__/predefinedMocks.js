// import jest from 'jest';
import { useAuth } from '@/contexts/AuthContext';
import { useList } from '@/hooks/useList';

// mock useRouter
jest.mock('next/dist/client/router', () => require('next-router-mock'));

// mocking the useList hook
jest.mock('@/hooks/useList', () => ({
  useList: jest.fn(),
}));

// mocking the useAuth hook
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

/**
 *
 * @returns {{
 * data: {
 * id: '1',
 * name: 'Test List',
 * owner: {
 * id: '1',
 * username: '',
 * email: 'test@test.com',
 * },
 * description: 'test description',
 * experiences: [],
 * },
 * isSuccess: true,
 * isError: false,
 * }}
 */

export function useListMock() {
  return useList.mockImplementation(() => ({
    data: {
      id: '1',
      name: 'Test List',
      owner: {
        id: '1',
        username: '',
        email: 'test@test.com',
      },
      description: 'test description',
      experiences: [
        {
          Course: {
            CourseTitle: 'Test Title',
            CourseProviderName: 'Course Provider Name',
          },
          meta: {
            id: '1',
            metadata_key_hash: '1',
          },
        },
      ],
    },
    isSuccess: true,
    isError: false,
  }));
}

/**
 * @returns {{
 * data:{
 * id: '1',
 * name: 'Test List',
 * owner: {
 * id: '1',
 * username: '',
 * email: 'test@test.com',
 * },
 * description: 'test description',
 * experiences: [],
 * },
 * isSuccess: true,
 * isError: false,
 * }}
 */

export function useListMockWithNoExperiences() {
  return useList.mockImplementation(() => ({
    data: {
      id: '1',
      name: 'Test List',
      owner: {
        id: '1',
        username: '',
        email: 'test@test.com',
      },
      description: 'test description',
      experiences: [],
    },
    isSuccess: true,
    isError: false,
  }));
}

/**
 *
 * @returns {{
 * data:{},
 * isSuccess: false,
 * isError: true,
 * error: {
 * response: {
 * status: 401,
 * },
 * },
 * }}
 */

export function useListMockWith401() {
  return useList.mockImplementation(() => ({
    data: {},
    isSuccess: false,
    isError: true,
    error: {
      response: {
        status: 401,
      },
    },
  }));
}

/**
 *
 * @returns {{
 * data:{},
 * isSuccess: false,
 * isError: true,
 * error: {
 * response: {
 * status: 403,
 * },
 * },
 * }}
 */

export function useListMockWith403() {
  return useList.mockImplementation(() => ({
    data: {},
    isSuccess: false,
    isError: true,
    error: {
      response: {
        status: 403,
      },
    },
  }));
}

/**
 *
 * @returns {{
 * user: {
 * user: {
 * id: '1',
 * username: 'test',
 * email: 'test@test.com',
 * },
 * },
 * }}
 */

export function useAuthenticatedUser() {
  return useAuth.mockReturnValue({
    user: {
      user: {
        id: '1',
        username: 'test',
        email: '',
      },
    },
  });
}

/**
 *
 * @returns {{
 * data: {
 * id: '1',
 * name: 'Test List',
 * owner: {
 * id: '1',
 * username: '',
 * email: '
 * },
 * description: 'test description',
 * experiences: [],
 * },
 * isSuccess: true,
 * isError: false,
 * }}
 */

export function useUnauthenticatedUser() {
  return useAuth.mockReturnValue({
    user: null,
  });
}
