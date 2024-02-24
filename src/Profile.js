import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getUserDataAction, updateUserProfile } from "./actions/AuthAction";
import { GET_USER_PROFILE, UPDATE_USER_PROFILE } from "./utils/URL";

const Profile = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector((store) => store.AuthReducer);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profile, setProfile] = useState("");

    const [newProfile, setNewProfile] = useState("");

    useEffect(() => {
        dispatch(getUserDataAction(GET_USER_PROFILE));
    }, []);

    useEffect(() => {
        if (userData && userData.data) {
            setName(userData.data.name);
            setEmail(userData.data.email);
            setProfile(userData.data.profile)
        }
    }, [userData]);

    const handleUpdateProfile = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("profile", newProfile);
        dispatch(updateUserProfile(UPDATE_USER_PROFILE, formData));
    }

    return (
        <div className="container">
            <h1>Profile</h1>
            <div>
                <img src={`http://localhost:4000/${profile}`} height='100px' />
            </div>
            <label for="email"><b>Name</b></label>
            <input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />

            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" value={email} readOnly />

            <label for="profile"><b>Profile</b></label>
            <input type="file" onChange={(e) => setNewProfile(e.target.files[0])} />

            <button type="button" className="registerbtn" onClick={handleUpdateProfile}>Update Profile</button>

        </div>
    );
}

export default Profile;
