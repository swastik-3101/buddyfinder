import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Comparison = () => {
  const [data, setData] = useState({
    daily: [],
    stats: {
      steps: { user: 8000, buddy: 10000 },
      heartRate: { user: 75, buddy: 72 },
      calories: { user: 400, buddy: 500 }
    }
  });

  useEffect(() => {
    // Simulate fetching data
    const mockData = [
      { day: 'Mon', user: 7500, buddy: 8000 },
      { day: 'Tue', user: 8000, buddy: 8500 },
      { day: 'Wed', user: 7800, buddy: 9000 },
      { day: 'Thu', user: 8200, buddy: 8800 },
      { day: 'Fri', user: 8500, buddy: 9200 }
    ];
    setData(prev => ({ ...prev, daily: mockData }));
  }, []);

  return (
    <Container>
      <h2 className="mb-4">Progress Comparison</h2>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Steps</Card.Title>
              <div className="d-flex justify-content-between">
                <div>You: {data.stats.steps.user}</div>
                <div>Buddy: {data.stats.steps.buddy}</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Heart Rate</Card.Title>
              <div className="d-flex justify-content-between">
                <div>You: {data.stats.heartRate.user} bpm</div>
                <div>Buddy: {data.stats.heartRate.buddy} bpm</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Calories Burned</Card.Title>
              <div className="d-flex justify-content-between">
                <div>You: {data.stats.calories.user}</div>
                <div>Buddy: {data.stats.calories.buddy}</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <Card.Title>Weekly Progress</Card.Title>
          <LineChart width={800} height={400} data={data.daily}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="user" stroke="#8884d8" name="You" />
            <Line type="monotone" dataKey="buddy" stroke="#82ca9d" name="Buddy" />
          </LineChart>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Comparison;