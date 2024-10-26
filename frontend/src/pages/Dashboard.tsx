import { useNavigate } from 'react-router-dom';
import ClientDashboard from '../Components/ClientDashboard';
import ThrpyDashboard from '../Components/ThrpyDashboard';
import { useEffect, useState } from 'react';

const ClientDashboardWrapper = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    // Clear token and clientId from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    // Redirect to login page
    navigate('/sign-in');
  };
  return <ClientDashboard onSignOut={handleSignOut} />;
};

const TherapistDashboardWrapper = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    // Clear token and therapistId from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    // Redirect to login page
    navigate('/sign-in');
  };
  return <ThrpyDashboard onSignOut={handleSignOut} />;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    // Retrieve user role and ID from localStorage
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('userId');
    
    if (role && id) {
      setUserRole(role);
      setUserId(parseInt(id, 10));
    } else {
      // Redirect to sign-in if role or ID is missing
      navigate('/sign-in');
    }
  }, [navigate]);

  if (userRole === 'CLIENT' && userId) {
    return <ClientDashboardWrapper />;
  } else if (userRole === 'THERAPIST' && userId) {
    return <TherapistDashboardWrapper/>;
  } else {
    return <div>Invalid or unauthorized role</div>;
  }
};

export default Dashboard;
