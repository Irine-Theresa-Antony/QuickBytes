import { useEffect, useState } from 'react';
import '../Dashboard.css';
import axios from 'axios';

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    location: '',
    occupation: '',
    bio: '',
  });

  const [profileId, setProfileId] = useState(null);

 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:3000/profile');
        if (res.data) {
          setFormData(res.data);
          setProfileId(res.data._id);
        }
      } catch (err) {
        console.error(err);
        alert('Error fetching profile');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.post('http://localhost:3000/profiles', formData);
      alert(res.data || 'Profile saved successfully');
    } catch (err) {
      console.error(err);
      alert('Error saving profile');
    }
  };

  const handleUpdate = async () => {
    if (!profileId) {
      alert("No profile to update");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:3000/${profileId}`, formData);
      alert(res.data || 'Profile updated successfully');
    } catch (err) {
      console.error(err);
      alert('Error updating profile');
    }
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-form">
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
        <input type="number" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
        <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} />
        <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
        <input type="text" name="occupation" placeholder="Occupation" value={formData.occupation} onChange={handleChange} />
        <textarea name="bio" placeholder="Short Bio" value={formData.bio} onChange={handleChange} rows="3" />
        <div className="profile-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
