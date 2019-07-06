import * as actionTypes from "../actions/actionTypes";

const objFilter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

export default scheduleReducer = {
	[actionTypes.SCHEDULE_FETCH_HOME_SUCCESS]: (state, action) => ({
    ...state,
    postedSchedules: action.posted,
    bookedSchedules: action.booked
  }),

  [actionTypes.SCHEDULE_CREATE_SUCCESS]: (state, action) => ({
    ...state,
    schedules: {
      ...state.schedules,
      [action.id]: action.schedule
    },
    postedSchedules: state.postedSchedules.concat([action.scheduleId]),
    user: {
      ...state.user,
      postedScheduleIds: state.user.postedSchedules[action.scheduleId] = true,
    },
    screen: "Home"
  }),

  [actionTypes.SCHEDULE_UPDATE_SUCCESS]: (state, action) => ( {
    ...state,
    schedules: {
      ...state.schedules,
      [action.scheduleId]: {
        ...state.schedules[action.scheduleId],
        ...action.schedule
      }
    },
    editScheduleId: '',
    screen: "Home"
  }),

  [actionTypes.FETCH_SCHEDULE_SUCCESS]: (state, action) => {
    const now = Date.now();
    const schedules = objFilter(
      state.schedules, 
      schedule => now - schedule.timeFetched < 2000000 
    )
    schedules[action.id] = action.schedule;
    return {
      ...state,
      schedules
    }
  },

  [actionTypes.REMOVE_SCHEDULE]: (state, action) => {
    const {[action.scheduleId]: value, ...bookedSchedules} = state.user.bookedSchedules;
    const {[action.scheduleId]: value2, ...postedSchedules} = state.user.postedSchedules;
    return {
      ...state,
      user: {
        ...state.user,
        bookedSchedules,
        postedSchedules,
      }
    }
  },

  [actionTypes.BOOK_SCHEDULE_SUCCESS]: (state, action) => ({
    ...state,
    schedules: {
      ...state.schedule,
      [action.scheduleId]: {
        ...state.schedules[action.scheduleId],
        isBooked: 1
      }
    },
    bookedSchedules: state.bookedSchedules.concat([action.scheduleId]),
    user: {
      ...state.user,
      bookedSchedules: {
        ...state.user.bookedSchedules,
        [action.scheduleId]: true,
      }
    }
  }),

  [actionTypes.UNBOOK_SCHEDULE_SUCCESS]: (state, action) => {
    const {[action.scheduleId]: value, ...bookedSchedules} = state.user.bookedSchedules;
    return {
      ...state,
      schedules: {
        ...state.schedule,
        [action.scheduleId]: {
          ...state.schedules[action.scheduleId],
          isBooked: 0
        }
      },
      bookedSchedules: Object.keys(state.user.bookedSchedules),
      user: {
        ...state.user,
        bookedSchedules
      }
    }
  },
}