import React, { useState, useEffect } from 'react'
import { Router } from 'react-router-dom'
import history from '@utils/history'
import { IntlProvider } from 'react-intl'
import enUS from 'antd/es/locale/en_US'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import PubSub from 'pubsub-js'
import { en, zh } from './locales'
import Layout from './layouts'
// 引入重置样式（antd已经重置了一部分了）
import './assets/css/reset.css'

function App() {
  const [locale, setLocale] = useState('zh')
  useEffect(() => {
    const token = PubSub.subscribe('LANGUAGE', (message, data) => {
      console.log(333)
      setLocale(data)
      return () => {
        PubSub.unsubscribe(token)
      }
    })
  }, [])
  const message = locale === 'en' ? en : zh
  const antdLocale = locale === 'en' ? enUS : zhCN
  return (
    <Router history={history}>
      <ConfigProvider locale={antdLocale}>
        <IntlProvider locale={locale} messages={message}>
          <Layout />
        </IntlProvider>
      </ConfigProvider>
    </Router>
  )
}

export default App
