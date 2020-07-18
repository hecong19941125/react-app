import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Cascader, Button, message } from 'antd'
import { connect } from 'react-redux'
import { reqGetAllTeacherList } from '@api/edu/teacher'
import { reqGetAllSubjectList, reqGetSecSubjectList } from '@api/edu/subject'
import { getCourseCategoryList } from '../redux'
import { FormattedMessage, useIntl } from 'react-intl'
import './index.less'

const { Option } = Select

function SearchForm(props) {
  const intl = useIntl()
  const [form] = Form.useForm()
  const [teacherList, setTeacherList] = useState([])
  const [subjectList, setSubjectList] = useState([])
  // const [options, setOptions] = useState([
  //   {
  //     value: '',
  //     label: '',
  //     isLeaf: false
  //   }
  // ])
  useEffect(() => {
    console.log(2222)
    let isUnmount = false
    async function fetchData() {
      const [teacherList, subjectList] = await Promise.all([
        reqGetAllTeacherList(),
        reqGetAllSubjectList()
      ])

      const options = subjectList.map((subject) => {
        return {
          value: subject._id,
          label: subject.title,
          isLeaf: false
        }
      })
      if(!isUnmount) {
      setSubjectList(options)
      setTeacherList(teacherList)
      }
    }
    fetchData()
    return () => isUnmount = true
   
  }, [])

  const onChange = (value, selectedOptions) => {
    // console.log(value, selectedOptions);
  }

  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    const id = targetOption.value
    const res = await reqGetSecSubjectList(id)
    targetOption.loading = false
    const secSubject = res.items.map((item) => {
      return {
        value: item._id,
        label: item.title
      }
    })
    if (secSubject.length > 0) {
      targetOption.children = secSubject
    } else {
      targetOption.isLeaf = true
    }

    setSubjectList([...subjectList])
  }

  const resetForm = () => {
    form.resetFields()
  }

  const finish = (value) => {
    let subjectId
    let subjectParentId
    if (value.subject && value.subject.length > 1) {
      subjectId = value.subject[1]
      subjectParentId = value.subject[0]
    }
    if (value.subject && value.subject.length === 1) {
      subjectId = value.subject[0]
      subjectParentId = 0
    }
    const data = {
      page: 1,
      limit: 5,
      title: value.title,
      teacherId: value.teacherId,
      subjectId,
      subjectParentId
    }
    props.getCourseCategoryList(data)
    message.success('请求发送成功')
  }
  return (
    <Form layout="inline" form={form} onFinish={finish}>
      <Form.Item name="title" label={<FormattedMessage id="title" />}>
        <Input
          placeholder={intl.formatMessage({ id: 'title' })}
          style={{ width: 250, marginRight: 20 }}
        />
      </Form.Item>
      <Form.Item name="teacherId" label={<FormattedMessage id="teacher" />}>
        <Select
          allowClear
          placeholder={intl.formatMessage({ id: 'teacher' })}
          style={{ width: 250, marginRight: 20 }}
        >
          {teacherList.map((teacher) => (
            <Option value={teacher._id} key={teacher._id}>
              {teacher.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="subject" label={<FormattedMessage id="subject" />}>
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={subjectList}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder={intl.formatMessage({ id: 'subject' })}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: '0 10px 0 30px' }}
        >
          {<FormattedMessage id="searchBtn" />}
        </Button>
        <Button onClick={resetForm}>
          {<FormattedMessage id="resetBtn" />}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default connect(null, { getCourseCategoryList })(SearchForm)
