import request from '@utils/request'

const BASE_URL = '/admin/edu/course'
// const MOCK_URL = `http://localhost:8888${BASE_URL}`

export function reqGetCourseList() {
  return request({
    url: `${BASE_URL}`,
    method: 'GET'
  })
}

