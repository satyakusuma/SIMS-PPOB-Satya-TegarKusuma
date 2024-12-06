import React, { useEffect, useState } from "react";
import profileDefault from "../../assets/Profile Photo.png";
import { Form, Image, InputGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, editProfileAsync, editProfileImageAsync } from "../../redux/akunSlice";
import { useNavigate } from "react-router-dom";
import './EditAkun.css';

const EditAkun = () => {
  const [inputDisabled, setInputDisabled] = useState(true);
  const [editButtonText, setEditButtonText] = useState("Edit Profil");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.akun.data);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
    }
  }, [profile]);

  const handleEditProfile = () => {
    if (inputDisabled) {
      setInputDisabled(false);
      setEditButtonText("Simpan");
    } else {
      setInputDisabled(true);
      setEditButtonText("Edit Profil");
      try {
        const updatedProfileData = {
          first_name: firstName,
          last_name: lastName,
        };
        dispatch(editProfileAsync(updatedProfileData)).then(() => {
          alert('Profil berhasil diperbarui!');
        }).catch((error) => {
          console.log("Error updating profile:", error);
        });
      } catch (error) {
        console.log("Error updating profile:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file.size <= 100 * 1024 && allowedImageTypes.includes(file.type)) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        dispatch(editProfileImageAsync(formData)).then(() => {
          alert('Sukses Mengubah Foto');
        }).catch((error) => {
          console.log("Error updating profile image:", error);
        });
      } catch (error) {
        console.log("Error updating profile image:", error);
      }
    } else {
      alert('Gagal Mengubah Foto. Maksimal ukuran foto 100KB.');
    }
  };

  return (
    <div className="edit-akun-container">
      <div className="profile-picture">
        <Image src={profile?.profile_image || profileDefault} alt="Profile" className="profile-img" />
        <label htmlFor="imageInput" className="edit-icon">
          <i className="ri-pencil-line"></i>
        </label>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>
      <div className="profile-name">
        <h2>{firstName} {lastName}</h2>
      </div>
      <div className="form-group centered-form-group">
        <label>Email</label>
        <InputGroup>
          <Form.Control
            type="email"
            value={profile?.email}
            readOnly
          />
          <i className="ri-at-line input-icon-left"></i>
        </InputGroup>
      </div>
      <div className="form-group centered-form-group">
        <label>Nama Depan</label>
        <InputGroup>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={inputDisabled}
            className={inputDisabled ? 'disabled-input' : ''}
          />
          <i className="ri-user-line input-icon-left"></i>
        </InputGroup>
      </div>
      <div className="form-group centered-form-group">
        <label>Nama Belakang</label>
        <InputGroup>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={inputDisabled}
            className={inputDisabled ? 'disabled-input' : ''}
          />
          <i className="ri-user-line input-icon-left"></i>
        </InputGroup>
      </div>
      <Button variant="danger" className="save-button" onClick={handleEditProfile}>
        {editButtonText}
      </Button>
      {editButtonText === "Edit Profil" && (
        <Button variant="outline-danger" className="logout-button" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default EditAkun;
