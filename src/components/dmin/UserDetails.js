import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDetails = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the backend
    axios.get('https://elitetrips-backend.onrender.com/api/admin/users')
      .then(response => {
        // Filter out users with the role of 'admin'
        const nonAdminUsers = response.data.filter(user => user.role !== 'admin');
        setUsers(nonAdminUsers);
      })
      .catch(error => {
        console.error('There was an error fetching the user data!', error);
      });
  }, []);

  const deleteUser = (userId) => {
    // Delete user from the backend
    axios.delete(`https://elitetrips-backend.onrender.com/api/admin/users/${userId}`)
      .then(() => {
        // Remove the deleted user from the state
        setUsers(users.filter(user => user._id !== userId));
      })
      .catch(error => {
        console.error('There was an error deleting the user!', error);
      });
  };

  return (
    <div className='pl-14'>
      <h2 className="text-5xl flex justify-center  items-center font-bold mb-4 pb-6">Admin Dashboard</h2>
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone No.</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.phoneNo}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;