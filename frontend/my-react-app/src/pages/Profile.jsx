//profile.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Target, Watch, Award, Activity, Calendar, Camera, Edit2, Save } from 'lucide-react';
import { Container, Row, Col, Card, Tabs, Tab, Alert, Badge } from 'react-bootstrap';

const Profile = () => {
  const [profile, setProfile] = useState({
    personalInfo: {
      name: 'John Doe',
      email: 'john@example.com',
      age: 28,
      height: 175,
      weight: 70,
      bmi: 22.9,
      profileImage: '/api/placeholder/150/150',
    },
    fitnessInfo: {
      activityLevel: 'Intermediate',
      goal: 'Weight Loss',
      achievements: [
        { id: 1, title: '7 Day Streak', icon: Award },
        { id: 2, title: 'Weight Goal', icon: Target },
        { id: 3, title: 'Early Bird', icon: Calendar },
      ],
    },
    stats: {
      streak: 15,
      workoutsCompleted: 48,
      hoursLogged: 72,
      caloriesBurned: 12500,
    },
    deviceInfo: {
      device: 'Apple Watch',
      connected: true,
      lastSync: '2024-12-20 09:30 AM',
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (section, field, value) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <Container>
        <motion.div initial="hidden" animate="visible" variants={cardVariants} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-6">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              My Profile
            </h2>
            <div className="d-flex gap-4">
              <Badge bg="primary" className="px-4 py-2">Level 12</Badge>
              <Badge bg="success" className="px-4 py-2">Pro Member</Badge>
            </div>
          </div>

          {showSuccess && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Alert variant="success" className="mb-4 rounded-lg">
                Profile updated successfully!
              </Alert>
            </motion.div>
          )}

          {/* Tabs */}
          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
            <Tab eventKey="personal" title={<span><User className="me-2" />Personal Info</span>}>
              <Card className="shadow-lg border-0 rounded-xl p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="text-xl font-semibold">Personal Information</h3>
                  <button
                    onClick={() => (isEditing ? handleSaveChanges() : setIsEditing(true))}
                    className="btn btn-primary"
                  >
                    {isEditing ? (
                      <>
                        <Save size={16} className="me-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit2 size={16} className="me-2" />
                        Edit Profile
                      </>
                    )}
                  </button>
                </div>
                <Row className="g-4">
                  <Col md={6}>
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={profile.personalInfo.name}
                      disabled={!isEditing}
                      onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                      className="form-control"
                    />
                  </Col>
                  <Col md={6}>
                    <label>Email</label>
                    <input
                      type="email"
                      value={profile.personalInfo.email}
                      disabled={!isEditing}
                      onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                      className="form-control"
                    />
                  </Col>
                  <Col md={6}>
                    <label>Age</label>
                    <input
                      type="number"
                      value={profile.personalInfo.age}
                      disabled={!isEditing}
                      onChange={(e) => handleInputChange('personalInfo', 'age', e.target.value)}
                      className="form-control"
                    />
                  </Col>
                  <Col md={6}>
                    <label>Height (cm)</label>
                    <input
                      type="number"
                      value={profile.personalInfo.height}
                      disabled={!isEditing}
                      onChange={(e) => handleInputChange('personalInfo', 'height', e.target.value)}
                      className="form-control"
                    />
                  </Col>
                  <Col md={6}>
                    <label>Weight (kg)</label>
                    <input
                      type="number"
                      value={profile.personalInfo.weight}
                      disabled={!isEditing}
                      onChange={(e) => handleInputChange('personalInfo', 'weight', e.target.value)}
                      className="form-control"
                    />
                  </Col>
                  <Col md={6}>
                    <label>BMI</label>
                    <input
                      type="number"
                      value={profile.personalInfo.bmi}
                      disabled
                      className="form-control bg-light"
                    />
                  </Col>
                </Row>
              </Card>
            </Tab>

            <Tab eventKey="fitness" title={<span><Activity className="me-2" />Fitness</span>}>
              <Card className="shadow-lg border-0 rounded-xl p-4">
                {/* Fitness Content */}
              </Card>
            </Tab>

            <Tab eventKey="device" title={<span><Watch className="me-2" />Device</span>}>
              <Card className="shadow-lg border-0 rounded-xl p-4">
                {/* Device Content */}
              </Card>
            </Tab>
          </Tabs>

          {/* Stats Cards */}
          <Row>
            <Col md={4}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className="text-center shadow-lg border-0 rounded-xl p-4">
                  <Target size={40} className="mx-auto text-blue-500 mb-2" />
                  <h3>Goal</h3>
                  <p>Weight Loss</p>
                </Card>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className="text-center shadow-lg border-0 rounded-xl p-4">
                  <Award size={40} className="mx-auto text-purple-500 mb-2" />
                  <h3>Achievements</h3>
                  <p>12 Badges Earned</p>
                </Card>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className="text-center shadow-lg border-0 rounded-xl p-4">
                  <Calendar size={40} className="mx-auto text-indigo-500 mb-2" />
                  <h3>Streak</h3>
                  <p>15 Days</p>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </div>
  );
};

export default Profile;
