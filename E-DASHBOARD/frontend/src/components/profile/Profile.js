import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
function Profile() {
  const auth = JSON.parse(localStorage.getItem('user'));
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
         <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Profile
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Name: {auth.name?auth.name:"NA" }
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Email: {auth.email?auth.email:"NA" }
            </Typography>
          </CardContent>
        </Card>
     
    </div>
  );
}

export default Profile;
