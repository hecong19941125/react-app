import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Card, Form, Button, Select, Input, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { reqGetSubjectList, reqAddSubjectList } from '@api/edu/subject'
import './index.less'

//表单布局属性
const layout = {
  // antd把一个宽度分为24份
  // 表单文字描述部分
  labelCol: {
    span: 3
  },
  // 表单项部分
  wrapperCol: {
    span: 6
  }
}

const Option = Select.Option

export default class addSubject extends Component {
  page = 1
  state = {
    subjectList: {
      total: 0,
      items: []
    }
  }
  async componentDidMount() {
    const res = await reqGetSubjectList(this.page++, 10)

    this.setState({
      subjectList: res
    })
  }
  showMoreSubject = async () => {
    const res = await reqGetSubjectList(this.page++, 10)
    let newState = [...this.state.subjectList.items, ...res.items]
    this.setState({
      subjectList: {
        total: res.total,
        items: newState
      }
    })
  }

  // 点击添加按钮,表单校验成功之后的回调函数
  onFinish = async (values) => {
    try {
      await reqAddSubjectList(values.subjectname, values.parentid)
      message.success('添加课程成功')
      this.props.history.push('/edu/subject/list')
    } catch {
      message.error('添加课程失败')
    }
  }
  render() {
    return (
      <Card
        title={
          <>
            <Link to="/edu/subject/list">
              <ArrowLeftOutlined />
            </Link>
            <span className="add-subject">新增</span>
          </>
        }
      >
        <Form {...layout} name="subject" onFinish={this.onFinish}>
          <Form.Item
            label="课程分类名称"
            name="subjectname"
            rules={[
              {
                required: true,
                message: '请输入课程分类!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="父级分类id"
            name="parentid"
            rules={[
              {
                required: true,
                message: '请选择分类id'
              }
            ]}
          >
            <Select
              dropdownRender={(menu) => {
                return (
                  <>
                    {menu}
                    {this.state.subjectList.total >
                      this.state.subjectList.items.length && (
                      <Button onClick={this.showMoreSubject}>
                        展示更多课程
                      </Button>
                    )}
                  </>
                )
              }}
            >
              <Option value={0} key={0}>
                {'一级课程分类'}
              </Option>
              {this.state.subjectList.items.map((subject) => {
                return (
                  <Option value={subject._id} key={subject._id}>
                    {subject.title}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              添加
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

