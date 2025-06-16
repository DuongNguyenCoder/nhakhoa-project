import React from 'react'
import ProfileForm from "@/components/auth/ProfileForm";
import { useSelector } from "react-redux";

const ProfilePage = () => {
    const currentUser = useSelector((state) => state.app.currentUser);
    return <ProfileForm currentUser={currentUser} />;
};

export default ProfilePage
