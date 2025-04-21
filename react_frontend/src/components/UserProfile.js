import React, { useState, useEffect } from 'react';
import { fetchUserDetails } from '../api';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const data = await fetchUserDetails();
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    getUserDetails();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {userDetails ? (<div className="space-y-4"><p><strong>Full Name:</strong> {userDetails.fullName}</p><p><strong>Username:</strong> {userDetails.username}</p></div>) : (<p>Loading user details...</p>)}
      </CardContent>
    </Card>
  );
};
export default UserProfile;