import React, { createContext, useState, useEffect } from 'react';

export const PortalContext = createContext();

const initialRooms = [
  { room_id: 'r1', name: 'Presidential Suite', type: 'Suite', price: 250000, capacity: 4, beds: 2, availability: true },
  { room_id: 'r2', name: 'Ocean View Reserve', type: 'Reserve', price: 120000, capacity: 2, beds: 1, availability: true },
  { room_id: 'r3', name: 'Private Sanctuary', type: 'Sanctuary', price: 85000, capacity: 2, beds: 1, availability: true },
  { room_id: 'r4', name: 'Executive Penthouse', type: 'Suite', price: 350000, capacity: 6, beds: 3, availability: true },
  { room_id: 'r5', name: 'Honeymoon Reserve', type: 'Reserve', price: 150000, capacity: 2, beds: 1, availability: true },
  { room_id: 'r6', name: 'Forest Sanctuary', type: 'Sanctuary', price: 75000, capacity: 4, beds: 2, availability: true },
];

const initialUsers = [
  { user_id: 'u1', name: 'Admin Operative', email: 'admin@blackcube.ae', password: 'password', role: 'admin', blocked: false },
  { user_id: 'u2', name: 'Guest User', email: 'customer@blackcube.ae', password: 'password', role: 'customer', blocked: false },
];

export const PortalProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem('grand_rooms_inr');
    return saved ? JSON.parse(saved) : initialRooms;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('grand_users_inr');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('grand_bookings_inr');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { localStorage.setItem('grand_rooms_inr', JSON.stringify(rooms)); }, [rooms]);
  useEffect(() => { localStorage.setItem('grand_users_inr', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('grand_bookings_inr', JSON.stringify(bookings)); }, [bookings]);

  // Auth Functions
  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid credentials");
    if (user.blocked) throw new Error("Access Denied: Account Blacklisted");
    setCurrentUser(user);
    return user;
  };
  
  const logout = () => setCurrentUser(null);
  
  const register = (data) => {
    if (users.find(u => u.email === data.email)) throw new Error("Agent already registered");
    const newUser = { user_id: Date.now().toString(), role: 'customer', blocked: false, ...data };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };

  // Admin Features
  const addRoom = (room) => setRooms([...rooms, { room_id: Date.now().toString(), availability: true, ...room }]);
  const updateRoom = (id, updated) => setRooms(rooms.map(r => r.room_id === id ? { ...r, ...updated } : r));
  const deleteRoom = (id) => setRooms(rooms.filter(r => r.room_id !== id));
  
  const toggleUserBlock = (id) => setUsers(users.map(u => u.user_id === id ? { ...u, blocked: !u.blocked } : u));
  const updateBookingStatus = (id, status) => setBookings(bookings.map(b => b.booking_id === id ? { ...b, status } : b));

  // Customer Features
  const createBooking = (bookingData) => {
    const newBooking = { booking_id: Date.now().toString(), status: 'Pending', ...bookingData };
    setBookings([...bookings, newBooking]);
    return newBooking;
  };
  
  const cancelBooking = (id) => updateBookingStatus(id, 'Cancelled');

  return (
    <PortalContext.Provider value={{
      currentUser, login, logout, register,
      rooms, addRoom, updateRoom, deleteRoom,
      users, toggleUserBlock,
      bookings, createBooking, cancelBooking, updateBookingStatus
    }}>
      {children}
    </PortalContext.Provider>
  );
};
