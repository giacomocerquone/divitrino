export default {
  1: (state) => {
    return {
      ...state,
      children: {
        ...state.children,
        absences: [],
      },
    };
  },
  2: (state) => {
    return {
      ...state,
      user: {
        ...state.user,
        unreadMessagesCount: 0,
        daysOfLessons: 0,
      },
    };
  },
  3: (state) => {
    return {
      ...state,
      cms: {
        token: '',
      },
    };
  },
};
