import { reqGetSubjectList, reqGetSecSubjectList, reqUpdateSubject } from '@api/edu/subject'

import { GET_SUBJECT_LIST, GET_SECSUBJECT_LIST, UPDATE_SUBJECT } from './constants'
import Title from 'antd/lib/skeleton/Title'

const getSubjectListSync = (list) => ({
  type: GET_SUBJECT_LIST,
  data: list
})

export const getSubjectList = (page, limit) => {
  return (dispatch) => {
    return reqGetSubjectList(page, limit).then((response) => {
      dispatch(getSubjectListSync(response))
      return response
    })
  }
}

const getSecSubjectListSync = (list) => ({
  type: GET_SECSUBJECT_LIST,
  data: list
})

export const getSecSubjectList = (parentId) => {
  return (dispatch) => {
    return reqGetSecSubjectList(parentId).then((response) => {
      dispatch(getSecSubjectListSync(response))
      return response
    })
  }
}

const UpdateSubjectSync = (data) => ({
  type: UPDATE_SUBJECT,
  data
})

export const UpdateSubject = (id, title) => {
  return (dispatch) => {
    return reqUpdateSubject(id, title).then((response) => {
      dispatch(UpdateSubjectSync({id, title}))
      return response
    })
  }
}