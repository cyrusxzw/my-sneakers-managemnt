import { Row, Col } from 'antd';
import Sidebar from './section/sidebar/index.js'
import Table from './component/table';
import Header from './section/header';

function App() {
  return (
    <Row>
      <Col span={3}>
        <Sidebar />
      </Col>
      <Col span={21}>
        <Header />
        <Table />
      </Col>
    </Row>
  );
}

export default App;
