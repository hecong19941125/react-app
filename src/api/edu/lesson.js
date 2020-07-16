import request from '@utils/request'

const BASE_URL = '/admin/edu/lesson'
// const MOCK_URL = `http://localhost:8888${BASE_URL}`

export function reqGetLessonList(chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: 'GET'
  })
}
export function reqGetQiNiuToken() {
  return request({
    url: '/uploadtoken',
    method: 'GET'
  })
}

export function reqAddLesson({chapterId, title, free, video}) {
  return request({
    url: `${BASE_URL}/save`,
    method: 'POST',
    data: {
      chapterId,
      title,
      free,
      video
    }
  })
}

export function reqBatchDelLesson(idList) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: 'DELETE',
    data: {
      idList
    }
  })
}