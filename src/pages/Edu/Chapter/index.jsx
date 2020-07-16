import React, { Component } from 'react'
import { Button, message, Tooltip, Modal, Alert, Table } from 'antd'
import {
  FullscreenOutlined,
  RedoOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'

import { connect } from 'react-redux'
import Player from 'griffith'
import screenfull from 'screenfull'
import SearchForm from './SearchForm'
import { getLessonList, batchDelChapter, batchDelLesson } from './redux'

import './index.less'

dayjs.extend(relativeTime)

@connect(
  (state) => ({
    // courseList: state.courseList
    // permissionValueList: filterPermissions(
    //   state.course.permissionValueList,
    //   "Course"
    // )
    chapterList: state.chapterList
  }),
  { getLessonList, batchDelChapter, batchDelLesson }
  // { getcourseList }
)
class Chapter extends Component {
  state = {
    searchLoading: false,
    previewVisible: false,
    selectedRowKeys: [],
    video: ''
  }

  showImgModal = video => () => {
    
      this.setState({
        previewVisible: true,
        video
      })
    
  }

  handleImgModal = () => {
    this.setState({
      previewVisible: false
    })
  }

  componentDidMount() {
    // const { page, limit } = this.state;
    // this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true
    })

    this.getcourseList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit
      })
    })
  }

  getcourseList = ({ page, limit, Coursename, nickName }) => {
    return this.props
      .getcourseList({ page, limit, Coursename, nickName })
      .then((total) => {
        if (total === 0) {
          message.warning('暂无用户列表数据')
          return
        }
        message.success('获取用户列表数据成功')
      })
  }

  onSelectChange = (selectedRowKeys) => {
    // console.log(selectedRowKeys)
    this.setState({
      selectedRowKeys
    })
    
  }
  handleExpand = async (expand, record) => {
    if (expand) {
      await this.props.getLessonList(record._id)
    }
  }
  handleToAddLesson = (data) => () => {
    this.props.history.push('/edu/chapter/addlesson', { chapterId: data._id })
  }

  handleBatchDel = () => {
    Modal.confirm({
      title: '确定要删除吗',
      onOk: async () => {
        let chapterIds = []
        let lessonIds = []
        // selectedRowKeys
        this.props.chapterList.items.forEach(item => {
          let chapterId = item._id
          let index = this.state.selectedRowKeys.indexOf(chapterId)
          if(index > -1) {
            let arr = this.state.selectedRowKeys.splice(index, 1)
            chapterIds.push(arr[0])
          }
        })
        lessonIds = [...this.state.selectedRowKeys]
        await this.props.batchDelChapter(chapterIds)
        await this.props.batchDelLesson(lessonIds)
        message.success('批量删除成功')
      }
    })
  }

  handleScreenfull = () => {
    screenfull.toggle()
  }
  render() {
    const { previewVisible, selectedRowKeys } = this.state
    const sources = {
      hd: {
        play_url: this.state.video,
       	bitrate: 1,
        duration: 1000,
        format: '',
        height: 500,
        size: 160000,
        width: 500
      }
    }
    const columns = [
      {
        title: '章节名称',
        dataIndex: 'title'
      },
      {
        title: '是否免费',
        dataIndex: 'free',
        render: (isFree) => {
          return isFree === true ? '是' : isFree === false ? '否' : ''
        }
      },
      {
        title: '视频',
        render: (value) => {
          
          if (!value.free) return
          return <button onClick={this.showImgModal(value.video)}>预览</button>
        }
      },
      {
        title: '操作',
        width: 300,
        fixed: 'right',
        render: (data) => {
          
          return (
            <div>
              {data.free === undefined && (
                <Tooltip title="新增章节">
                  <Button
                    type="primary"
                    onClick={this.handleToAddLesson(data)}
                    style={{ marginRight: 10 }}
                  >
                    <PlusOutlined />
                  </Button>
                </Tooltip>
              )}

              <Tooltip
                title={data.free === undefined ? '更新章节' : '更新课时'}
              >
                <Button type="primary" style={{ marginRight: 10 }}>
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip
                title={data.free === undefined ? '删除章节' : '删除课时'}
              >
                <Button type="danger">
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </div>
          )
          
        }
      }
    ]

   

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
      // hideDefaultSelections: true,
      // selections: [
      //   Table.SELECTION_ALL,
      //   Table.SELECTION_INVERT,
      //   {
      //     key: "odd",
      //     text: "Select Odd Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return false;
      //         }
      //         return true;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   },
      //   {
      //     key: "even",
      //     text: "Select Even Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return true;
      //         }
      //         return false;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   }
      // ]
    }

    return (
      <div>
        <div className="course-search">
          <SearchForm />
        </div>
        <div className="course-table">
          <div className="course-table-header">
            <h3>课程章节列表</h3>
            <div>
              <Button type="primary" style={{ marginRight: 10 }}>
                <PlusOutlined />
                <span>新增</span>
              </Button>
              <Button type="danger" style={{ marginRight: 10 }} onClick={this.handleBatchDel}>
                <span>批量删除</span>
              </Button>
              <Tooltip title="全屏" className="course-table-btn">
                <FullscreenOutlined onClick={this.handleScreenfull} />
              </Tooltip>
              <Tooltip title="刷新" className="course-table-btn">
                <RedoOutlined />
              </Tooltip>
              <Tooltip title="设置" className="course-table-btn">
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
          <Alert
            message={
              <span>
                <InfoCircleOutlined
                  style={{ marginRight: 10, color: '#1890ff' }}
                />
                {`已选择 ${selectedRowKeys.length} 项`}
              </span>
            }
            type="info"
            style={{ marginBottom: 20 }}
          />
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.chapterList.items}
            rowKey="_id"
            expandable={{ onExpand: this.handleExpand }}
          />
        </div>

        <Modal
          title='视频'
          visible={previewVisible}
          footer={null}
          onCancel={this.handleImgModal}
          destroyOnClose={true}
        >
          <Player
            sources={sources}
            id={'1'}
            cover={'http://localhost:3000/logo512.png'}
            duration={1000}
          ></Player>
        </Modal>
      </div>
    )
  }
}

export default Chapter
