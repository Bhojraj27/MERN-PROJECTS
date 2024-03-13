import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import Axios from 'axios';
import ApiConfig from '../../ApiConfig';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = JSON.parse(localStorage.getItem('user')); // Parse the stored user object
  const fetchUserData = async () => {
    try {
        const response = await Axios.get(`${ApiConfig.profile}`, {
            headers: {
                Authorization: localStorage.getItem('token'), // Retrieve the token from localStorage
            }
        });
        setUserData(response.data.user);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

  useEffect(() => {
   
    fetchUserData();
  }, [auth]); // Add auth as dependency to useEffect so that it runs when auth changes

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Profile
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Name: {userData.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Email: {userData.email}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Profile;
