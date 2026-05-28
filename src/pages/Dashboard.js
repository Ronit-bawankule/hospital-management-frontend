import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const ROLE_COLORS = {
  ADMIN:        '#7c3aed',
  DOCTOR:       '#0d9488',
  RECEPTIONIST: '#d97706',
};

const NAV_ITEMS = {
  ADMIN: [
    { icon: '🏠', label: 'Dashboard',    path: '/dashboard' },
    { icon: '👥', label: 'Patients',     path: '/patients' },
    { icon: '👨‍⚕️', label: 'Doctors',    path: '/doctors' },
    { icon: '📅', label: 'Appointments', path: '/appointments' },
    { icon: '🛏️', label: 'Rooms / ICU', path: '/rooms' },
    { icon: '💊', label: 'Inventory',    path: '/inventory' },
    { icon: '💳', label: 'Billing',      path: '/billing' },
    { icon: '📊', label: 'Reports',      path: '/reports' },
    { icon: '⚙️', label: 'Settings',    path: '/settings' },
  ],
  DOCTOR: [
    { icon: '🏠', label: 'Dashboard',      path: '/dashboard' },
    { icon: '👥', label: 'My Patients',    path: '/patients' },
    { icon: '📅', label: 'Appointments',   path: '/appointments' },
    { icon: '📊', label: 'Reports',        path: '/reports' },
  ],
  RECEPTIONIST: [
    { icon: '🏠', label: 'Dashboard',    path: '/dashboard' },
    { icon: '👥', label: 'Patients',     path: '/patients' },
    { icon: '📅', label: 'Appointments', path: '/appointments' },
    { icon: '🛏️', label: 'Rooms',       path: '/rooms' },
    { icon: '💳', label: 'Billing',      path: '/billing' },
  ],
};

const STATS = {
  ADMIN: [
    { label: 'Total Patients',        value: '1,284', icon: '👥', color: '#1d4ed8' },
    { label: 'Active Doctors',        value: '48',    icon: '👨‍⚕️', color: '#0d9488' },
    { label: "Today's Appointments",  value: '73',    icon: '📅', color: '#7c3aed' },
    { label: 'Available Beds',        value: '32',    icon: '🛏️', color: '#d97706' },
  ],
  DOCTOR: [
    { label: 'My Patients',           value: '24', icon: '👥', color: '#1d4ed8' },
    { label: "Today's Appointments",  value: '8',  icon: '📅', color: '#7c3aed' },
    { label: 'Completed Today',       value: '5',  icon: '✅', color: '#0d9488' },
    { label: 'Pending Reports',       value: '3',  icon: '📋', color: '#d97706' },
  ],
  RECEPTIONIST: [
    { label: "Today's Appointments",  value: '73', icon: '📅', color: '#7c3aed' },
    { label: 'New Patients Today',    value: '7',  icon: '👥', color: '#1d4ed8' },
    { label: 'Available Beds',        value: '32', icon: '🛏️', color: '#0d9488' },
    { label: 'Pending Bills',         value: '12', icon: '💳', color: '#d97706' },
  ],
};

const RECENT_ACTIVITY = [
  { text: 'Patient Rahul Sharma registered',    time: '2 min ago',  icon: '👤' },
  { text: 'Appointment #1042 confirmed',         time: '15 min ago', icon: '📅' },
  { text: 'Dr. Smith added a prescription',      time: '1 hr ago',   icon: '💊' },
  { text: 'Room 204 marked as available',        time: '2 hrs ago',  icon: '🛏️' },
  { text: 'Invoice #892 generated',             time: '3 hrs ago',  icon: '💳' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user,        setUser]        = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) { navigate('/login'); return; }
    try { setUser(JSON.parse(stored)); }
    catch { navigate('/login'); }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  const roleColor = ROLE_COLORS[user.role] || '#1d4ed8';
  const navItems  = NAV_ITEMS[user.role]   || NAV_ITEMS.RECEPTIONIST;
  const stats     = STATS[user.role]       || STATS.RECEPTIONIST;

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="dashboard-layout">

      {/* ── Sidebar ────────────────────────────────────────────────────── */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">🏥</span>
            {sidebarOpen && <span className="logo-text">MediCare HMS</span>}
          </div>
          <button
            className="toggle-btn"
            onClick={() => setSidebarOpen(v => !v)}
            title={sidebarOpen ? 'Collapse' : 'Expand'}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={`nav-item ${item.path === '/dashboard' ? 'active' : ''}`}
              onClick={() =>
                item.path !== '/dashboard'
                  ? alert(`${item.label} module — coming soon!`)
                  : undefined
              }
              title={!sidebarOpen ? item.label : undefined}
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar" style={{ background: roleColor }}>
              {user.name?.charAt(0)?.toUpperCase()}
            </div>
            {sidebarOpen && (
              <div className="user-details">
                <span className="user-name">{user.name}</span>
                <span className="user-role" style={{ color: roleColor }}>
                  {user.role}
                </span>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          )}
        </div>
      </aside>

      {/* ── Main ───────────────────────────────────────────────────────── */}
      <main className="main-content">

        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <h2>Welcome back, {user.name?.split(' ')[0]}! 👋</h2>
            <p>{today}</p>
          </div>
          <div className="topbar-right">
            <button className="notif-btn" title="Notifications">🔔</button>
            <div className="role-badge" style={{ background: roleColor }}>
              {user.role}
            </div>
          </div>
        </header>

        <div className="dashboard-content">

          {/* Stats */}
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div className="stat-card" key={i}>
                <div
                  className="stat-icon"
                  style={{ background: stat.color + '18', color: stat.color }}
                >
                  {stat.icon}
                </div>
                <div className="stat-info">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions + Activity */}
          <div className="section-grid">
            <div className="card">
              <h3 className="card-title">⚡ Quick Actions</h3>
              <div className="quick-actions">
                {user.role !== 'DOCTOR' && (
                  <button
                    className="action-btn"
                    onClick={() => alert('Patient module — coming soon!')}
                  >
                    <span>➕</span> New Patient
                  </button>
                )}
                <button
                  className="action-btn"
                  onClick={() => alert('Appointments module — coming soon!')}
                >
                  <span>📅</span> Book Appointment
                </button>
                {user.role !== 'DOCTOR' && (
                  <button
                    className="action-btn"
                    onClick={() => alert('Billing module — coming soon!')}
                  >
                    <span>💳</span> Create Bill
                  </button>
                )}
                {user.role === 'ADMIN' && (
                  <button
                    className="action-btn"
                    onClick={() => alert('Doctors module — coming soon!')}
                  >
                    <span>👨‍⚕️</span> Add Doctor
                  </button>
                )}
                {user.role === 'DOCTOR' && (
                  <button
                    className="action-btn"
                    onClick={() => alert('Reports module — coming soon!')}
                  >
                    <span>📋</span> View Reports
                  </button>
                )}
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">🕐 Recent Activity</h3>
              <div className="activity-list">
                {RECENT_ACTIVITY.map((item, i) => (
                  <div className="activity-item" key={i}>
                    <span className="activity-icon">{item.icon}</span>
                    <div className="activity-info">
                      <span className="activity-text">{item.text}</span>
                      <span className="activity-time">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="card">
            <h3 className="card-title">🛠️ System Status</h3>
            <div className="status-grid">
              {[
                { label: 'Authentication',  status: 'online' },
                { label: 'Database',        status: 'online' },
                { label: 'Email Service',   status: 'online' },
                { label: 'Patient Module',  status: 'coming' },
                { label: 'Doctor Module',   status: 'coming' },
                { label: 'Billing Module',  status: 'coming' },
                { label: 'Inventory',       status: 'coming' },
                { label: 'Reports',         status: 'coming' },
                { label: 'Payment Gateway', status: 'coming' },
              ].map((item, i) => (
                <div className="status-item" key={i}>
                  <span className={`status-dot ${item.status}`} />
                  {item.label}
                  <span className={`status-text ${item.status}`}>
                    {item.status === 'online' ? '● Live' : '⏳ Soon'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;