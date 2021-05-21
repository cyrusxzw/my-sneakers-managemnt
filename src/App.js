import { HashRouter, Route } from 'react-router-dom';
import { Row, Col } from 'antd';
import Sidebar from './section/sidebar/index.js'
import Table from './component/table';
import Report from './component/report/';
import Header from './section/header';
import './App.less';

function App() {
  return (
    <HashRouter>
      <Row>
        <Col span={3} style={{ 'backgroundColor': '#002140' }}>
          <Sidebar />
        </Col>
        <Col span={21}>
          <Header />
          <Route exact path="/" render={() => {
            return (
              <div className="home-container">
                <h1>欢迎来到许增威的球鞋管理系统！</h1>
              </div>
            )
          }} />
          <Route exact path="/managment" component={Table} />
          <Route exact path="/report" component={Report} />
        </Col>
      </Row>
    </HashRouter>
  );
}

export default App;
