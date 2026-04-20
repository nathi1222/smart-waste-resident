import React, { useState } from 'react';

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  onUpdateProfile: (name: string, email: string, phone: string, address: string) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ 
  onBack, 
  onLogout, 
  userName, 
  userEmail, 
  userPhone, 
  userAddress, 
  onUpdateProfile 
}) => {
  // ALL HOOKS AT THE TOP
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState(userPhone);
  const [address, setAddress] = useState(userAddress);
  const [unitNumber, setUnitNumber] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleSave = () => {
    onUpdateProfile(name, email, phone, address);
    setIsEditing(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    onLogout();
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const paymentMethods = [
    { id: 1, type: 'Credit Card', last4: '4242', expiry: '12/26', isDefault: true },
    { id: 2, type: 'Debit Card', last4: '8888', expiry: '08/25', isDefault: false },
  ];

  const recentPayments = [
    { id: 1, date: 'April 1, 2026', amount: 85.00, status: 'Paid', method: 'Credit Card' },
    { id: 2, date: 'March 1, 2026', amount: 85.00, status: 'Paid', method: 'Credit Card' },
    { id: 3, date: 'February 1, 2026', amount: 85.00, status: 'Paid', method: 'Debit Card' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">👋</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Logout?</h3>
              <p className="text-gray-500 text-sm mt-2">Are you sure you want to logout? You'll need to login again to access your account.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={cancelLogout}
                className="flex-1 bg-gray-100 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 bg-red-600 text-white font-medium py-3 rounded-xl hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 px-5 pt-12 pb-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white text-2xl p-1">←</button>
          <div>
            <h1 className="text-white text-xl font-semibold">My Profile</h1>
            <p className="text-green-200 text-xs mt-0.5">Manage your account settings</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 pb-20">
        {/* Profile Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
            <span className="text-4xl text-white">{userName.charAt(0).toUpperCase()}</span>
          </div>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="text-green-600 text-sm font-medium"
            >
              Edit Profile ✎
            </button>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-1 rounded-lg text-sm"
              >
                Save
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 text-gray-700 px-4 py-1 rounded-lg text-sm"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Personal Information */}
        <div className="mb-6">
          <h3 className="text-gray-800 font-semibold text-sm mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-green-500 rounded-full"></span>
            Personal Information
          </h3>
          <div className="space-y-3">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-gray-600 text-xs mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-xs mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-xs mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Full Name</p>
                  <p className="text-sm font-medium text-gray-800">{name}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Email Address</p>
                  <p className="text-sm font-medium text-gray-800">{email}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Phone Number</p>
                  <p className="text-sm font-medium text-gray-800">{phone}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Address Information */}
        <div className="mb-6">
          <h3 className="text-gray-800 font-semibold text-sm mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-green-500 rounded-full"></span>
            Service Address
          </h3>
          <div className="bg-gray-50 rounded-lg p-3">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm mb-2"
                />
                <input
                  type="text"
                  value={unitNumber}
                  onChange={(e) => setUnitNumber(e.target.value)}
                  placeholder="Unit/Apartment number (optional)"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                />
              </>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{address}</p>
                  {unitNumber && <p className="text-xs text-gray-500 mt-1">Unit {unitNumber}</p>}
                </div>
                <button className="text-green-600 text-xs">Change →</button>
              </div>
            )}
          </div>
        </div>

        {/* Billing & Payment */}
        <div className="mb-6">
          <h3 className="text-gray-800 font-semibold text-sm mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-green-500 rounded-full"></span>
            Payment Methods
          </h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <div key={method.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💳</span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {method.type} •••• {method.last4}
                      </p>
                      <p className="text-xs text-gray-500">Expires {method.expiry}</p>
                    </div>
                  </div>
                  {method.isDefault && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Default</span>
                  )}
                </div>
              </div>
            ))}
            <button className="w-full border border-dashed border-gray-300 rounded-lg p-2 text-center text-green-600 text-sm">
              + Add Payment Method
            </button>
          </div>
        </div>

        {/* Payment History */}
        <div className="mb-6">
          <h3 className="text-gray-800 font-semibold text-sm mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-green-500 rounded-full"></span>
            Recent Payments
          </h3>
          <div className="space-y-2">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{payment.date}</p>
                    <p className="text-xs text-gray-500">{payment.method}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">{formatCurrency(payment.amount)}</p>
                    <p className="text-xs text-green-600">{payment.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="text-green-600 text-xs mt-2">View All →</button>
        </div>

        {/* Notification Settings */}
        <div className="mb-6">
          <h3 className="text-gray-800 font-semibold text-sm mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-green-500 rounded-full"></span>
            Notification Preferences
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">Push Notifications</p>
                <p className="text-xs text-gray-500">Receive collection reminders</p>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-10 h-5 rounded-full transition ${notificationsEnabled ? 'bg-green-600' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${notificationsEnabled ? 'translate-x-5' : 'translate-x-1'} mt-0.5`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">Email Notifications</p>
                <p className="text-xs text-gray-500">Billing statements and updates</p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`w-10 h-5 rounded-full transition ${emailNotifications ? 'bg-green-600' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${emailNotifications ? 'translate-x-5' : 'translate-x-1'} mt-0.5`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">SMS Notifications</p>
                <p className="text-xs text-gray-500">Service alerts and reminders</p>
              </div>
              <button
                onClick={() => setSmsNotifications(!smsNotifications)}
                className={`w-10 h-5 rounded-full transition ${smsNotifications ? 'bg-green-600' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${smsNotifications ? 'translate-x-5' : 'translate-x-1'} mt-0.5`} />
              </button>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="space-y-3">
          <button className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-3 rounded-xl text-sm hover:bg-gray-50 transition">
            Change Password
          </button>
          <button 
            onClick={handleLogoutClick}
            className="w-full bg-red-600 text-white font-medium py-3 rounded-xl text-sm hover:bg-red-700 transition"
          >
            Logout
          </button>
          <button className="w-full bg-white border border-red-200 text-red-600 font-medium py-3 rounded-xl text-sm hover:bg-red-50 transition">
            Delete Account
          </button>
        </div>

        {/* Version Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">App Version 2.0.0</p>
          <div className="flex justify-center gap-4 mt-2">
            <button className="text-xs text-gray-400">Terms of Service</button>
            <button className="text-xs text-gray-400">Privacy Policy</button>
            <button className="text-xs text-gray-400">Contact Support</button>
          </div>
        </div>
      </div>
      
      <div className="pb-2 flex justify-center">
        <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default ProfileScreen;