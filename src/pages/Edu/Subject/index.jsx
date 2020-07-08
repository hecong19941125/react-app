import React, { Component } from "react"
import { Button, Table } from 'antd'
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons'
import './index.less'
const columns = [
  { title: '分类名称', dataIndex: 'name', key: 'name' },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    width: 200,
    render: () => 
    <>
    <Button type="primary" className='update-btn'><FormOutlined /></Button>
    <Button type="danger"><DeleteOutlined /></Button>
    </>
  },
];
const data = [
  {
    key: 1,
    name: '前端',
  },
  {
    key: 2,
    name: '大数据',
  },
  {
    key: 3,
    name: '后端',
  },
  {
    key: 4,
    name: '运维',
  },
];
export default class Subject extends Component {
  render () {
    return <div className='subject'>
      <Button type="primary" className='subject-btn'><PlusOutlined />新建</Button>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
        dataSource={data}
      />
    </div>
  }
}
