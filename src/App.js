import React from "react";
import { Router } from "react-router-dom";
import history from "@utils/history";
import zhCN from 'antd/es/locale/zh_CN'
import {ConfigProvider} from 'antd'
import Layout from "./layouts";
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css";

function App() {
  return (
    <ConfigProvider locale={zhCN}>
    <Router history={history}>
      <Layout />
    </Router>
    </ConfigProvider>
  );
}

export default App;
