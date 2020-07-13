import request from '@utils/request'

const BASE_URL = '/admin/edu/lesson'
// const MOCK_URL = `http://localhost:8888${BASE_URL}`

export function reqGetLessonList(chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: 'GET'
  })
}