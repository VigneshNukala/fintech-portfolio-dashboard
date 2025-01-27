import { Bell, Shield, Globe, CreditCard, LogOut } from "lucide-react";

import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";

const Settings = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-900 pt-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold mb-8">Settings</h1>

          {/* Profile Section */}
          <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-200">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-700">
                JD
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Jhon Doe</h2>
                <p className="text-sm text-gray-500">johndoe@gmail.com</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Edit Profile
            </button>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Notifications */}
            <SettingsSection title="Notifications" icon={<Bell />}>
              <SettingsToggle
                label="Push Notifications"
                description="Receive push notifications for important updates"
              />
              <SettingsToggle
                label="Email Notifications"
                description="Receive email notifications for account activity"
              />
              <SettingsToggle
                label="Trade Alerts"
                description="Get notified about significant market movements"
              />
            </SettingsSection>

            {/* Security */}
            <SettingsSection title="Security" icon={<Shield />}>
              <SettingsToggle
                label="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
              />
              <SettingsToggle
                label="Login Alerts"
                description="Get notified of new device logins"
              />
            </SettingsSection>

            {/* Preferences */}
            <SettingsSection title="Preferences" icon={<Globe />}>
              <SettingsSelect
                label="Language"
                options={["English", "Spanish", "French", "German"]}
                value="English"
              />
              <SettingsSelect
                label="Currency"
                options={["USD ($)", "EUR (€)", "GBP (£)", "JPY (¥)"]}
                value="USD ($)"
              />
              <SettingsToggle
                label="Dark Mode"
                description="Toggle dark mode appearance"
                defaultChecked
              />
            </SettingsSection>

            {/* Payment Methods */}
            <SettingsSection title="Payment Methods" icon={<CreditCard />}>
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/24</p>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-500">
                    Edit
                  </button>
                </div>
              </div>
              <button className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300">
                Add Payment Method
              </button>
            </SettingsSection>

            {/* Danger Zone */}
            <div className="bg-white shadow-lg rounded-xl p-6 border border-red-200">
              <h3 className="text-red-500 font-semibold mb-4">Danger Zone</h3>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 flex items-center space-x-2">
                <LogOut className="h-5 w-5" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

type SettingsSectionProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

const SettingsSection = ({ title, icon, children }: SettingsSectionProps) => (
  <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
    <div className="flex items-center space-x-2 mb-6">
      <div className="text-blue-600">{icon}</div>
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

type SettingsToggleProps = {
  label: string;
  description: string;
  defaultChecked?: boolean;
};

const SettingsToggle = ({
  label,
  description,
  defaultChecked = false,
}: SettingsToggleProps) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="font-medium text-gray-800">{label}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        defaultChecked={defaultChecked}
      />
      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
    </label>
  </div>
);

type SettingsSelectProps = {
  label: string;
  options: string[];
  value: string;
};

const SettingsSelect = ({ label, options, value }: SettingsSelectProps) => (
  <div>
    <label className="block font-medium text-gray-800 mb-2">{label}</label>
    <select
      defaultValue={value}
      className="w-full bg-white text-gray-900 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default Settings;
