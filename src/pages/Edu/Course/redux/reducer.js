import { GET_COURSE_CATEGORY_LIST } from './constant'
const initCourseList = {
  total: 0,
  items: []
}
export function courseCategoryList(prevState = initCourseList, action) {
  switch (action.type) {
    case GET_COURSE_CATEGORY_LIST:
      return action.data
    default:
      return prevState
  }
}
