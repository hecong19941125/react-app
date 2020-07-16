import React, { Component } from 'react'
import { Button, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import * as qiniu from 'qiniu-js'
import { nanoid } from 'nanoid'
import { reqGetQiNiuToken } from '@api/edu/lesson'
export default class MyUpload extends Component {
  constructor() {
    super()
    const str = localStorage.getItem('upload_token')
    if (str) {
      const res = JSON.parse(str)
      this.state = {
        uploadToken: res.uploadToken,
        expires: res.expires
      }
    } else {
      this.state = {
        uploadToken: '',
        expires: 0
      }
    }
  }
  handleBeforeUpload = (file) => {
    const videoSize = 20 * 1024 * 1024
    return new Promise(async (resolve, reject) => {
      if (file.size > videoSize) {
        message.error('上传的视频大小不能超过20M')
        reject()
        return
      }
      if (Date.now() > this.state.expires) {
        const { uploadToken, expires } = await reqGetQiNiuToken()
        this.saveUploadToken(uploadToken, expires)
      } 
      resolve(file)
    })
  }
  saveUploadToken = (uploadToken, expires) => {
    expires = Date.now() + expires * 1000
    const upload_token = JSON.stringify({uploadToken, expires})
    localStorage.setItem('upload_token', upload_token)
    this.setState({
      uploadToken,
      expires
    })
  }
  handleCustomRequest = (value) => {
    console.log(value)
    const file = value.file
    const key = nanoid(10) + 'hc'
    const token = this.state.uploadToken
    const putExtra = {
      mimeType: "video/*"
    }
    const config = {
      region: qiniu.region.z2
    }
   
    const observable = qiniu.upload(file, key, token, putExtra, config)
    const observer = {
      next(res){
        value.onProgress(res.total)
      },
      error(err){
        console.log(err)
        value.onError(err)
      },
      complete : res => {
        value.onSuccess(res)
        this.props.onChange(`http://qdcdb1qpp.bkt.clouddn.com/${res.key}`)
      }
    }
    this.subscription = observable.subscribe(observer)
   
  }
  componentWillUnmount() {
    this.subscription && this.subscription.unsubscribe()
  }
  render() {
    
    return (
      <div>
        <Upload
          beforeUpload={this.handleBeforeUpload}
          customRequest={this.handleCustomRequest}
          accept = 'video/*'
        >
          <Button>
            <UploadOutlined />
            上传视频
          </Button>
        </Upload>
      </div>
    )
  }
}
