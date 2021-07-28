import { HashRouter, Route } from 'react-router-dom';
import { Row, Col } from 'antd';
import Sidebar from './section/sidebar'
import Login from './component/login'
import Table from './component/table';
import Report from './component/report/';
import Header from './section/header';
import './App.less';

function App() {
  return (
    <HashRouter>
      <Route exact path="/" component={Login} />
      <Row>
        <Col span={3} style={{ 'backgroundColor': '#002140' }}>
          <Sidebar />
        </Col>
        <Col span={21}>
          <Header />
          <Route exact path="/managment" component={Table} />
          <Route exact path="/report" component={Report} />
        </Col>
      </Row>
    </HashRouter>
  );
}

export default App;
