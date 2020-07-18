import request from '@utils/request'

const BASE_URL = '/admin/edu/course'
// const MOCK_URL = `http://localhost:8888${BASE_URL}`

export function reqGetCourseList() {
  return request({
    url: `${BASE_URL}`,
    method: 'GET'
  })
}

export function reqGetCourseCategoryList({page, limit, title, teacherId, subjectId, subjectParentId}) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: 'GET',
    params: {
      title,
      teacherId,
      subjectId,
      subjectParentId
    }
  })
}