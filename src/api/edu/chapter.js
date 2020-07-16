import request from '@utils/request'

const BASE_URL = '/admin/edu/chapter'
// const MOCK_URL = `http://localhost:8888${BASE_URL}`

export function reqGetChapterList({page,limit,courseId}) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: 'GET',
    params: {
      courseId
    }
  })
}

export function reqBatchDelChapter(idList) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: 'DELETE',
    data: {
      idList
    }
  })
}