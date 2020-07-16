import request from '@utils/request'

const BASE_URL = '/admin/edu/subject'
// const MOCK_URL = `http://localhost:8888${BASE_URL}`

export function reqGetSubjectList(page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: 'GET'
  })
}

export function reqGetSecSubjectList(parentId) {
  return request({
    url: `${BASE_URL}/get/${parentId}`,
    method: 'GET'
  })
}

export function reqAddSubjectList(title, parentId) {
  return request({
    url: `${BASE_URL}/save/`,
    method: 'POST',
    data: {
      title,
      parentId
    }
  })
}

export function reqUpdateSubject(id, title) {
  return request({
    url: `${BASE_URL}`,
    method: 'PUT',
    data: {
      id,
      title
    }
  })
}

export function reqDelSubject(id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: 'DELETE'
  })
}

export function reqGetAllSubjectList() {
  return request({
    url: `${BASE_URL}`,
    method: 'GET'
  })
}
