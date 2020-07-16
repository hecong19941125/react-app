import { GET_CHAPTER_LIST, GET_LESSON_LIST, BATCH_DEL_CHAPTER, BATCH_DEL_LESSON } from './constant'

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
      case BATCH_DEL_CHAPTER:
        let arr = prevState.items.filter(item => {
          if(action.data.indexOf(item._id) > -1) {
            return false
          }
          return true
        })
        
      return {
        ...prevState,
        items: arr
      }
      case BATCH_DEL_LESSON:
        prevState.items.forEach(chapter => {
          let arr = chapter.children.filter(item => {
            if(action.data.indexOf(item._id) > -1) {
              return false
            }
            return true
          })
          chapter.children = arr
        })
      return {
        ...prevState
      }
    default:
      return prevState
  }
}
