import {GET_COURSE_CATEGORY_LIST} from './constant'
import {reqGetCourseCategoryList} from '@api/edu/course'
function getCourseCategoryListSync(data) {
  return {type: GET_COURSE_CATEGORY_LIST, data}
}
export function getCourseCategoryList(data) {
  return dispatch => {
    return reqGetCourseCategoryList(data).then(res => {
      dispatch(getCourseCategoryListSync(res))
      return res
    })
  }
}