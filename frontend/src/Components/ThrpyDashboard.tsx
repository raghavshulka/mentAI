import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';

interface Therapist {
    id: number;
    name: string;
    specialization: string;
}

interface Session {
    id: number;
    date: string;
    type: string;
}

interface Booking {
    id: number;
    status: string;
    createdAt: string;
}

interface ThrpyDashboardProps {
    onSignOut: () => void;
}

const ThrpyDashboard: React.FC<ThrpyDashboardProps> = ({ onSignOut }) => {
    const [therapist, setTherapist] = useState<Therapist | null>(null);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTherapistData = async () => {
            try {
                // Fetch the logged-in user
                const userResponse = await axios.get(`http://localhost:3000/api/v1/users/me`);
                const userId = userResponse.data.id;

                // Fetch therapist data based on userId
                const therapistResponse = await axios.get(`http://localhost:3000/api/v1/thrpy/therapists?userId=${userId}`);
                const therapistData = therapistResponse.data;

                if (therapistData) {
                    setTherapist(therapistData);

                    // Fetch sessions and bookings using therapistId
                    const therapistId = therapistData.id;

                    const sessionsResponse = await axios.get(`http://localhost:3000/api/v1/event/sessions?therapistId=${therapistId}`);
                    setSessions(sessionsResponse.data);

                    const bookingsResponse = await axios.get(`http://localhost:3000/api/v1/event/bookings?therapistId=${therapistId}`);
                    setBookings(bookingsResponse.data);
                }

                setError(null);
            } catch (error) {
                console.error("Failed to load data:", error);
                setError("Failed to load therapist data. Please try again later.");
            }
        };

        fetchTherapistData();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white p-4 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Therapist Dashboard</h2>

                {/* Therapist Info */}
                {therapist ? (
                    <div className="space-y-2">
                        <p><strong>Name:</strong> {therapist.name}</p>
                        <p><strong>Specialization:</strong> {therapist.specialization}</p>
                    </div>
                ) : (
                    <p>Loading therapist data...</p>
                )}

                {/* Sessions */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Sessions</h3>
                    {sessions.length > 0 ? (
                        <ul className="space-y-2">
                            {sessions.map((session) => (
                                <li key={session.id} className="p-3 border rounded-md">
                                    <p><strong>Date:</strong> {session.date}</p>
                                    <p><strong>Type:</strong> {session.type}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No sessions found.</p>
                    )}
                </div>

                {/* Bookings */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Bookings</h3>
                    {bookings.length > 0 ? (
                        <ul className="space-y-2">
                            {bookings.map((booking) => (
                                <li key={booking.id} className="p-3 border rounded-md">
                                    <p><strong>Status:</strong> {booking.status}</p>
                                    <p><strong>Date:</strong> {booking.createdAt}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No bookings found.</p>
                    )}
                </div>

                {/* Sign Out Button */}
                <Button onClick={onSignOut} className="mt-6 bg-red-500 text-white px-4 py-2 rounded">
                    Sign Out
                </Button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default ThrpyDashboard;
