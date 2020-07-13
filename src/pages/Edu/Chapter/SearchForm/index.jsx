import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import { Form, Select, Button, message } from 'antd'
import { reqGetCourseList } from '@api/edu/course'

import {getChapterList} from '../redux'
import './index.less'

const { Option } = Select

function SearchForm(props) {
  
  const [courseList, setCourseList] = useState([])
  useEffect(() => {
    async function fetchData() {
      const res = await reqGetCourseList()

      setCourseList(res)
    }
    fetchData()
  }, [])
  const [form] = Form.useForm()

  const resetForm = () => {
    form.resetFields()
  }
  const handleChapterList = async(value) =>  {
    
    const data = {
      page: 1,
      limit: 10,
      courseId: value.courseId
    }
    await props.getChapterList(data)
    message.success('获取课程章节数据成功')
  }

  return (
    <Form layout="inline" form={form} onFinish={handleChapterList}>
      <Form.Item name="courseId" label="课程">
        <Select
          allowClear
          placeholder="课程"
          style={{ width: 250, marginRight: 20 }}
        >
          {courseList.map((course) => (
            <Option key={course._id} value={course._id}>
              {course.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: '0 10px 0 30px' }}
        >
          查询课程章节
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  )
}

export default connect(null,{getChapterList})(SearchForm)
