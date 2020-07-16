import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Card, Form, Button, Upload, Input, message, Switch } from 'antd'
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons'
import MyUpload from '../MyUpload'
import {reqAddLesson} from '@api/edu/lesson'
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

export default class addLesson extends Component {
  // 点击添加按钮,表单校验成功之后的回调函数
  onFinish = async (value) => {
    // const title = value.title
    // const free = value.free
    // const video = `http://qqcdb1qpp.bkt.clouddn.com/${value.video }`
    const chapterId = this.props.location.state.chapterId
    await reqAddLesson({chapterId,...value})
    message.success('添加课时成功')
    this.props.history.push('/edu/chapter/list')
  }
  render() {
    
    return (
      <Card
        title={
          <>
            <Link to="/edu/chapter">
              <ArrowLeftOutlined />
            </Link>
            <span className="add-lesson">新增</span>
          </>
        }
      >
        <Form {...layout} onFinish={this.onFinish} initialValues={{free: true}}>
          <Form.Item
            label="课时名称"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入课时!'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="是否免费"
            name="free"
            rules={[
              {
                required: true,
                message: '请选择是否免费'
              }
            ]}
            valuePropName='checked'
          >
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              defaultChecked
            />
          </Form.Item>
          <Form.Item
            label="上传视频"
            name="video"
            rules={[
              {
                required: true,
                message: '请上传视频'
              }
            ]}
          >
           <MyUpload />
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
