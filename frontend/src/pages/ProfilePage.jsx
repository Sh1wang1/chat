import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, User, Mail } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  if (!authUser) {
    return (
      <div className="h-screen flex items-center justify-center text-base-content">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="h-screen pt-20 bg-base-100 text-base-content">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-200 rounded-xl p-6 space-y-9 shadow-lg border border-base-300">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-base-content/60">
              Manage your profile information
            </p>
          </div>

          {/* Profile Image */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 rounded-full p-2 cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/60">
              {isUpdatingProfile
                ? "Updating profile picture..."
                : "Click to change your profile picture"}
            </p>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <div className="text-sm text-base-content/60 flex items-center gap-2">
              <User className="w-5 h-5 text-base-content/40" />
              Full Name
            </div>
            <p className="px-4 py-2.5 bg-base-100 rounded-lg border border-base-300">
              {authUser?.fullName}
            </p>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <div className="text-sm text-base-content/60 flex items-center gap-2">
              <Mail className="w-5 h-5 text-base-content/40" />
              Email Address
            </div>
            <p className="px-4 py-2.5 bg-base-100 rounded-lg border border-base-300">
              {authUser?.email}
            </p>
          </div>

          {/* Account Info */}
          <div className="mt-6 bg-base-100 rounded-xl p-6 border border-base-300">
            <h2 className="text-lg font-semibold mb-4">Account Information</h2>
            <div className="space-y-3 text-sm text-base-content/80">
              <div className="flex items-center justify-between border-b border-base-300 py-2">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0] || "N/A"}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
