import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FindBuddy = () => {
  const [profile, setProfile] = useState({
    bmi: '',
    goal: '',
    activityLevel: '',
  });
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/profile');
      return;
    }

    const fetchBuddies = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}/buddies`);
        setMatches(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch buddies');
      }
    };

    fetchBuddies();
  }, [userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userResponse = await axios.post('http://localhost:5000/api/users', {
        ...profile,
        name: 'Test User',
        email: 'test@example.com',
      });

      const fetchedUserId = userResponse.data._id;
      const matchesResponse = await axios.get(`http://localhost:5000/api/buddies/find/${fetchedUserId}`);
      setMatches(matchesResponse.data);
      localStorage.setItem('userId', fetchedUserId);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (buddyId) => {
    try {
      await axios.post('http://localhost:5000/api/buddies/connect', { userId, buddyId });
      setMatches(matches.filter((match) => match._id !== buddyId));
      alert('Successfully connected with buddy!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to connect with buddy');
    }
  };

  if (!userId) return null;

  return (
    <Container>
      <h2 className="mb-4">Find Your Fitness Buddy</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Your BMI</Form.Label>
                  <Form.Control
                    type="number"
                    value={profile.bmi}
                    onChange={(e) => setProfile({ ...profile, bmi: parseFloat(e.target.value) })}
                    placeholder="Enter your BMI"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Fitness Goal</Form.Label>
                  <Form.Select
                    value={profile.goal}
                    onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
                    required
                  >
                    <option value="">Select a goal</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="General Fitness">General Fitness</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Activity Level</Form.Label>
                  <Form.Select
                    value={profile.activityLevel}
                    onChange={(e) => setProfile({ ...profile, activityLevel: e.target.value })}
                    required
                  >
                    <option value="">Select level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? 'Finding Matches...' : 'Find Matches'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Row>
            {matches.length === 0 ? (
              <Col>
                <Alert variant="info">
                  No matches found yet. Check back later or adjust your profile!
                </Alert>
              </Col>
            ) : (
              matches.map((buddy) => (
                <Col md={6} key={buddy._id} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{buddy.name}</Card.Title>
                      <Card.Text>
                        <p>BMI: {buddy.bmi}</p>
                        <p>Goal: {buddy.goal}</p>
                        <p>Activity Level: {buddy.activityLevel}</p>
                      </Card.Text>
                      <Button variant="primary" onClick={() => handleConnect(buddy._id)}>
                        Connect
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default FindBuddy;
