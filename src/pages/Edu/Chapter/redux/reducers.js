import { GET_CHAPTER_LIST, GET_LESSON_LIST } from './constant'

const initState = {
  total: 0,
  items: []
}
export default function chapterList(prevState = initState, action) {
  switch (action.type) {
    case GET_CHAPTER_LIST:
      if (action.data.items.length > 0) {
        action.data.items.forEach((item) => {
          item.children = []
        })
      }
      return action.data
    case GET_LESSON_LIST:
      if (action.data.length > 0) {
        prevState.items.forEach((item) => {
          if (item._id === action.data[0].chapterId) {
            item.children = action.data
          }
        })
      }

      return { ...prevState }
    default:
      return prevState
  }
}
