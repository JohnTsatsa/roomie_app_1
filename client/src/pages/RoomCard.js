import { Link } from 'react-router-dom';

function RoomCard({ rooms, isUserLoggedIn }) {

    return (
        <div>
            {rooms.map((room) => (
                <div key={room._id}>
                    <h2>{room.title}</h2>
                    <h3>Description</h3>
                    <p>{room.description}</p>
                    <h4>Phone Number</h4>
                    <p>{room.phoneNumber}</p>
                    {isUserLoggedIn ? (
                        <Link to={`/room/${room._id}`}>View</Link>
                    ) : (
                        <Link to="/login">Login to View</Link>
                    )}
                </div>
            ))}
        </div>
    );
}

export default RoomCard;
