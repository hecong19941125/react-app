import React, { Component } from 'react'
import { Button, Table, Tooltip, Input, message, Modal } from 'antd'
import { PlusOutlined, FormOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
// import { reqGetSubjectList } from '@api/edu/subject'
import { getSubjectList, getSecSubjectList, UpdateSubject } from './redux'
import { reqDelSubject } from '@api/edu/subject'
import './index.less'
const { confirm } = Modal
@connect(
  (state) => ({
    subjectList: state.subjectList
  }),
  { getSubjectList, getSecSubjectList, UpdateSubject }
)
class Subject extends Component {
  currentPage = 1
  pageSize = 5
  state = {
    id: '',
    title: ''
  }
  componentDidMount() {
    this.props.getSubjectList(1, 5)
  }

  // getSubjectList =  async (page, limit) => {
  // const result = await reqGetSubjectList(page, limit)
  // this.setState({
  //   subjectList: result
  // })
  //   this.props.getSubjectList(page,limit)
  // }
  handleChange = (page, pigeSize) => {
    // this.getSubjectList(page, pigeSize)
    this.props.getSubjectList(page, pigeSize)
    this.currentPage = page
  }
  handleSizeChange = (current, size) => {
    // this.getSubjectList(current, size)
    this.props.getSubjectList(current, size)
    this.currentPage = current
    this.pageSize = size
  }
  handleClick = () => {
    this.props.history.push('/edu/subject/add')
  }
  handleExpand = (expanded, record) => {
    if (expanded) {
      this.props.getSecSubjectList(record._id)
    }
  }
  handleInpChange = (e) => {
    this.setState({
      title: e.target.value.trim()
    })
  }
  showUpdateSubject = (value) => {
    return () => {
      this.setState({
        id: value._id,
        title: value.title
      })
      this.title = value.title
    }
  }
  handleCancel = () => {
    this.setState({
      id: '',
      title: ''
    })
  }
  handleUpdate = () => {
    let { id, title } = this.state
    if (title.length === 0) {
      message.error('输入内容不能为空')
      return
    }
    if (this.title === title) {
      message.error('输入内容不能和之前的相同')
      return
    }
    this.props.UpdateSubject(id, title)
    message.success('更新成功')
    this.handleCancel()
  }
  handleDel = (value) => () => {
    confirm({
      title: <div>确定要删除<span style={{color:'red', fontSize: 20 }}>{value.title}</span>吗</div>,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        await reqDelSubject(value._id)
        message.success('删除成功')
        const totalPage = Math.ceil(this.props.subjectList.total / this.pageSize)
        if(totalPage === this.currentPage && this.props.subjectList.items.length === 1 && this.currentPage !== 1) {
          this.props.getSubjectList(--this.currentPage, this.pageSize)
          return 
        }
        this.props.getSubjectList(this.currentPage, this.pageSize)
      }
    })
  }
  render() {
    const columns = [
      {
        title: '分类名称',
        key: 'title',
        render: (value) => {
          if (this.state.id === value._id) {
            return (
              <Input
                className="subject-Inp"
                value={this.state.title}
                onChange={this.handleInpChange}
              />
            )
          }
          return <span>{value.title}</span>
        }
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        width: 200,
        render: (value) => {
          if (this.state.id === value._id) {
            return (
              <>
                <Button
                  type="primary"
                  className="update-btn"
                  onClick={this.handleUpdate}
                >
                  确定
                </Button>
                <Button type="danger" onClick={this.handleCancel}>
                  取消
                </Button>
              </>
            )
          }
          return (
            <>
              <Tooltip title="修改课程">
                <Button
                  type="primary"
                  className="update-btn"
                  onClick={this.showUpdateSubject(value)}
                >
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title="删除课程" onClick={this.handleDel(value)}>
                <Button type="danger">
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </>
          )
        }
      }
    ]
    return (
      <div className="subject">
        <Button
          type="primary"
          className="subject-btn"
          onClick={this.handleClick}
        >
          <PlusOutlined />
          新建
        </Button>
        <Table
          columns={columns}
          expandable={{
            onExpand: this.handleExpand
          }}
          dataSource={this.props.subjectList.items}
          rowKey="_id"
          pagination={{
            total: this.props.subjectList.total, //total表示数据总数
            showQuickJumper: true, //是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数据数量
            pageSizeOptions: ['5', '10', '15'],
            defaultPageSize: 5,
            onChange: this.handleChange, //页码改变的时候触发,
            onShowSizeChange: this.handleSizeChange, //一页展示几条数据变化时触发 current 当前页码, size 一页几条
            current: this.currentPage
          }}
        />
      </div>
    )
  }
}
export default Subject
