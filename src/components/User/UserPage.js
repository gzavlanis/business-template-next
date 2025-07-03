'use client';
import React, { useState, useCallback } from 'react';
import { Save, UserIcon, MailIcon, ImageIcon, Phone, MapPin, Info } from 'lucide-react';

function UserPage({ theme, onUpdateProfile }) {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('(555) 123-4567');
  const [address, setAddress] = useState('123 Main St, Anytown, USA');
  const [bio, setBio] = useState('A passionate React developer and avid learner.');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState('https://placehold.co/150x150/ADB8C2/344050?text=Profile');
  const [statusMessage, setStatusMessage] = useState('');

  const cardBgColorClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColorClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';
  const inputBgColorClass = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50';
  const inputTextColorClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const inputBorderColorClass = theme === 'dark' ? 'border-gray-600 focus:border-blue-500' : 'border-gray-300 focus:border-blue-700';
  const buttonBgColorClass = theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-700 hover:bg-blue-800';
  const buttonTextColorClass = 'text-white';
  const buttonShadowClass = 'shadow-lg shadow-blue-500/50';

  const handleProfilePhotoChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePhoto(null);
      setProfilePhotoPreview('https://placehold.co/150x150/ADB8C2/344050?text=Profile');
    }
  }, []);

  const handleSaveChanges = useCallback((e) => {
    e.preventDefault();
    console.log('Saving profile changes:', { name, email, phone, address, bio, profilePhoto });
    onUpdateProfile({ name, email, phone, address, bio, profilePhoto: profilePhotoPreview });
    setStatusMessage('Profile updated successfully!');
    setTimeout(() => setStatusMessage(''), 3000);
  }, [name, email, phone, address, bio, profilePhoto, profilePhotoPreview, onUpdateProfile]);

  return (
    <div className={`relative p-8 rounded-lg shadow-2xl w-full mx-auto transition-colors duration-300 ease-in-out ${cardBgColorClass} ${textColorClass}`}>

      <h2 className="text-3xl font-bold text-center mb-6">Edit Profile</h2>

      <form onSubmit={handleSaveChanges} className="space-y-6">
        {/* Profile Photo Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-blue-500 shadow-lg">
            <img
              src={profilePhotoPreview}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/ADB8C2/344050?text=Profile'; }}
            />
            <label htmlFor="profile-photo-upload" className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer`}>
              <ImageIcon size={32} />
            </label>
            <input
              type="file"
              id="profile-photo-upload"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePhotoChange}
            />
          </div>
          <p className="text-sm">Click photo to upload new image</p>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Input */}
          <div>
            <label htmlFor="profile-name" className={`block text-sm font-medium mb-2 ${textColorClass}`}>Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"><UserIcon size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} /></span>
              <input
                type="text" id="profile-name"
                className={`w-full pl-10 pr-3 py-2 rounded-md border ${inputBorderColorClass} ${inputBgColorClass} ${inputTextColorClass} focus:ring-2 focus:outline-none`}
                value={name} onChange={(e) => setName(e.target.value)} required
              />
            </div>
          </div>
          {/* Email Input */}
          <div>
            <label htmlFor="profile-email" className={`block text-sm font-medium mb-2 ${textColorClass}`}>Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"><MailIcon size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} /></span>
              <input
                type="email" id="profile-email"
                className={`w-full pl-10 pr-3 py-2 rounded-md border ${inputBorderColorClass} ${inputBgColorClass} ${inputTextColorClass} focus:ring-2 focus:outline-none`}
                value={email} onChange={(e) => setEmail(e.target.value)} required
              />
            </div>
          </div>
          {/* Phone Number Input */}
          <div>
            <label htmlFor="profile-phone" className={`block text-sm font-medium mb-2 ${textColorClass}`}>Phone Number</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Phone size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} /></span>
              <input
                type="tel" id="profile-phone"
                className={`w-full pl-10 pr-3 py-2 rounded-md border ${inputBorderColorClass} ${inputBgColorClass} ${inputTextColorClass} focus:ring-2 focus:outline-none`}
                value={phone} onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          {/* Address Input */}
          <div>
            <label htmlFor="profile-address" className={`block text-sm font-medium mb-2 ${textColorClass}`}>Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"><MapPin size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} /></span>
              <input
                type="text" id="profile-address"
                className={`w-full pl-10 pr-3 py-2 rounded-md border ${inputBorderColorClass} ${inputBgColorClass} ${inputTextColorClass} focus:ring-2 focus:outline-none`}
                value={address} onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          {/* Bio Textarea */}
          <div className="md:col-span-2"> {/* This textarea will span 2 columns on medium screens and up */}
            <label htmlFor="profile-bio" className={`block text-sm font-medium mb-2 ${textColorClass}`}>Bio</label>
            <div className="relative">
              <span className="absolute top-3 left-0 flex items-center pl-3"><Info size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} /></span>
              <textarea
                id="profile-bio"
                rows="4"
                className={`w-full pl-10 pr-3 py-2 rounded-md border ${inputBorderColorClass} ${inputBgColorClass} ${inputTextColorClass} focus:ring-2 focus:outline-none resize-y`}
                value={bio} onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <p className="text-green-500 text-center text-sm mt-6">{statusMessage}</p>
        )}

        {/* Save Changes Button */}
        <button
          type="submit"
          className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ease-in-out ${buttonBgColorClass} ${buttonTextColorClass} ${buttonShadowClass} flex items-center justify-center space-x-2 mx-auto w-fit mt-8`}
        >
          <Save size={20} /><span>Save Changes</span>
        </button>
      </form>
    </div>
  );
}

export default UserPage;
