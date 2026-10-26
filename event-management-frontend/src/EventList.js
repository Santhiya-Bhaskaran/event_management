// src/EventList.js
import React, { useState } from 'react';
// Import the new EventItem component
import EventItem from './EventItem';


const EventList = (
	{ events, onEventDelete,
		onToggleReminder, onEventEdit
	}
) => {
	const [editedEvents, setEditedEvents] = useState([]);

	const handleEventEdit = (eventId, updatedData) => {
		// Find the index of the event being edited
		const eventIndex =
			editedEvents
				.findIndex(
					event =>
						event._id === eventId
				);

		if (eventIndex !== -1) {
			// Update the edited event in the local state
			const updatedEditedEvents = [...editedEvents];
			updatedEditedEvents[eventIndex] = {
				...updatedEditedEvents[eventIndex],
				...updatedData,
			};

			setEditedEvents(updatedEditedEvents);
		} else {
			// If the event is not already in the local state, add it
			setEditedEvents(
				[...editedEvents,
				{ _id: eventId, ...updatedData }
				]
			);
		}
		// Pass the edit request to the parent component
		onEventEdit(eventId, updatedData);
	};

	return (
		<div className="event-list">
			{events.map(event => (
				<EventItem
					key={event._id}
					event={
						editedEvents
							.find(
								editedEvent =>
									editedEvent._id === event._id) || event
					}
					onToggleReminder={onToggleReminder}
					onEventDelete={onEventDelete}
					onEventEdit={handleEventEdit}
				/>
			))}
		</div>
		
		
	);
};

const buttonStyle = {
	display: 'inline-block',
	padding: '10px 20px',
	backgroundColor: '#FFA500',
	color: '#fff',
	textDecoration: 'none',
	border: 'none',
	borderRadius: '5px',
	cursor: 'pointer',
	transition: 'background-color 0.3s ease',
	marginLeft: '160px' // Adjust spacing between buttons
  };

export default EventList;
