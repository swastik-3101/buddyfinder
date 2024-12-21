//Home.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, Users, ChartLine } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Container className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Row className="mb-8">
            <Col className="text-center">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Welcome to FitnessBuddy
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Find your perfect fitness partner and achieve your goals together!
              </p>
            </Col>
          </Row>
        </motion.div>

        <Row className="mb-8">
          <Col md={4} className="mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full shadow-lg border-0 rounded-xl overflow-hidden">
                <div className="h-48 bg-blue-500 flex items-center justify-center">
                  <Dumbbell size={64} className="text-white" />
                </div>
                <Card.Body className="p-6">
                  <Card.Title className="text-2xl font-bold mb-4">Start Your Journey</Card.Title>
                  <Card.Text className="text-gray-600 mb-4">
                    Set your fitness goals, track your progress, and begin your transformation today.
                  </Card.Text>
                  <Button
                    as={Link}
                    to="/profile"
                    className="w-full bg-blue-500 hover:bg-blue-600 border-0 py-3 rounded-lg"
                  >
                    Create Profile
                  </Button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col md={4} className="mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full shadow-lg border-0 rounded-xl overflow-hidden">
                <div className="h-48 bg-purple-500 flex items-center justify-center">
                  <Users size={64} className="text-white" />
                </div>
                <Card.Body className="p-6">
                  <Card.Title className="text-2xl font-bold mb-4">Find a Buddy</Card.Title>
                  <Card.Text className="text-gray-600 mb-4">
                    Get matched with someone who shares your fitness goals and motivation level.
                  </Card.Text>
                  <Button
                    as={Link}
                    to="/find-buddy"
                    className="w-full bg-purple-500 hover:bg-purple-600 border-0 py-3 rounded-lg"
                  >
                    Find Matches
                  </Button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col md={4} className="mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full shadow-lg border-0 rounded-xl overflow-hidden">
                <div className="h-48 bg-indigo-500 flex items-center justify-center">
                  <ChartLine size={64} className="text-white" />
                </div>
                <Card.Body className="p-6">
                  <Card.Title className="text-2xl font-bold mb-4">Track Progress</Card.Title>
                  <Card.Text className="text-gray-600 mb-4">
                    Compare your progress with your buddy and stay motivated together.
                  </Card.Text>
                  <Button
                    as={Link}
                    to="/comparison"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 border-0 py-3 rounded-lg"
                  >
                    View Progress
                  </Button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <img
            src="https://t3.ftcdn.net/jpg/02/90/98/90/360_F_290989072_F6Fa339A9tLtupv8UCkjFpf80XdPBoSG.jpg"
            alt="Fitness Motivation"
            className="rounded-2xl shadow-lg w-full object-cover mb-8"
          />
        </motion.div>
      </Container>
    </div>
  );
};

export default Home;