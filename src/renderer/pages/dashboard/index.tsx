import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000'); // Replace with your backend URL

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [analyticsData, setAnalyticsData] = useState({ users: 0, sales: 0 });

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data || []);
    };
    fetchUsers();
  }, []);

  // Real-time analytics
  useEffect(() => {
    socket.on('analytics', (data) => {
      setAnalyticsData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Add User
  const addUser = async () => {
    const response = await axios.post('http://localhost:5000/users', newUser);
    setUsers([...users, response.data]);
    setNewUser({ name: '', email: '' });
  };

  // Update User
  const updateUser = async (id, name, email) => {
    const response = await axios.put(`http://localhost:5000/users/${id}`, {
      name,
      email,
    });
    setUsers(users.map((user) => (user._id === id ? response.data : user)));
  };

  // Delete User
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    setUsers(users.filter((user) => user._id !== id));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-2 bg-light vh-100 p-3">
          <h4>Dashboard</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <button
                className={`btn btn-link nav-link ${activeTab === 'users' && 'active'}`}
                onClick={() => setActiveTab('users')}
              >
                Users
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-link nav-link ${activeTab === 'analytics' && 'active'}`}
                onClick={() => setActiveTab('analytics')}
              >
                Analytics
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-10 p-4">
          {activeTab === 'users' && (
            <div>
              <h3>Users</h3>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  className="form-control mt-2"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
                <button className="btn btn-primary mt-2" onClick={addUser}>
                  Add User
                </button>
              </div>
              <ul className="list-group">
                {users.map((user) => (
                  <li
                    key={user._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      {user.name} ({user.email})
                    </div>
                    <div>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() =>
                          updateUser(
                            user._id,
                            prompt('Name', user.name),
                            prompt('Email', user.email),
                          )
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h3>Analytics</h3>
              <p>Real-time Users: {analyticsData.users}</p>
              <p>Real-time Sales: ${analyticsData.sales.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
