'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Save, Trash2, Link, RefreshCw, LogOut, CheckCircle, ChevronDownIcon } from 'lucide-react';

// --- CalendarPage Component ---
function Calendar({ theme }) {
  const [currentDate, setCurrentDate] = useState(new Date()); // State for the current month/year displayed
  const [events, setEvents] = useState(() => {
    // Load events from localStorage or use a default set
    try {
      const savedEvents = localStorage.getItem('calendarEvents');
      return savedEvents ? JSON.parse(savedEvents) : [];
    } catch (error) {
      console.error("Failed to load events from localStorage:", error);
      return [];
    }
  });
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // For viewing/editing
  const [newEventDate, setNewEventDate] = useState(''); // For adding new event on specific date

  // Form states for new/edit event
  const [eventTitle, setEventTitle] = useState('');
  const [eventDateTime, setEventDateTime] = useState('');
  const [eventColor, setEventColor] = useState('#63B3ED'); // Default color
  const [eventDescription, setEventDescription] = useState('');
  const [showInstructions, setShowInstructions] = useState(false); // New state to toggle instructions visibility

  const handleDrop = useCallback((e, newDate) => {
    e.preventDefault();
    const eventId = e.dataTransfer.getData("text/plain");
    setEvents(prevEvents => prevEvents.map(event => {
        if (event.id === eventId) {
            // Note: Dragging a Google event locally won't update it in Google Calendar.
            // For full sync, you'd need to implement gapi.client.calendar.events.update here.
            return { ...event, date: newDate, dateTime: newDate + (event.dateTime ? event.dateTime.substring(10) : 'T09:00') };
        }
        return event;
    }));
  }, [setEvents]);

  const handleAddEventClick = (date) => {
    setSelectedEvent(null); // Ensure no event is selected for editing
    setNewEventDate(date);
    setEventTitle('');
    setEventDateTime(`${date}T09:00`); // Default time to 9 AM
    setEventColor('#63B3ED'); // Reset color
    setEventDescription('');
    setShowEventModal(true);
  };

  const handleViewEvent = useCallback((event) => {
    setSelectedEvent(event);
    setEventTitle(event.title || '');
    setEventDateTime(event.dateTime || `${event.date}T09:00`);
    setEventColor(event.color || '#63B3ED');
    setEventDescription(event.description || '');
    setShowEventModal(true);
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('calendarEvents', JSON.stringify(events));
    } catch (error) {
      console.error("Failed to save events to localStorage:", error);
    }
  }, [events]);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday

  const navigateMonth = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  // --- Google Calendar Integration State and Functions ---
  const [googleCalendarAuthStatus, setGoogleCalendarAuthStatus] = useState('signed_out'); // 'signed_out', 'signed_in', 'loading'
  const [googleCalendarError, setGoogleCalendarError] = useState('');

  // Google API client library (gapi) related constants (placeholders)
  // You MUST replace these with your actual credentials from Google Cloud Console
  // 1. Go to Google Cloud Console (console.developers.google.com)
  // 2. Create a new project or select an existing one.
  // 3. Go to "APIs & Services" -> "Library", search for "Google Calendar API" and ENABLE it.
  // 4. Go to "APIs & Services" -> "Credentials"
  //    - For `CLIENT_ID`: Click "Create Credentials" -> "OAuth client ID" -> "Web application".
  //      Add your app's origin (e.g., http://localhost:3000 or the URL of this Canvas preview)
  //      to "Authorized JavaScript origins".
  //      Add your app's redirect URI (e.g., http://localhost:3000 or the URL of this Canvas preview)
  //      to "Authorized redirect URIs".
  //      The `CLIENT_ID` will be provided after creation.
  //    - For `API_KEY`: Click "Create Credentials" -> "API key". (Less common for user-specific
  //      calendar access, primarily for public data or if using a service account with domain-wide delegation).
  //      For user-specific events, OAuth (`CLIENT_ID`) is the main mechanism.
  const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'; // Replace with your actual client ID
  const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY'; // Replace with your actual API Key (optional, can be empty if only using OAuth)
  const GOOGLE_DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  const GOOGLE_SCOPES = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly"; // Scopes for read and write access

  const gapiLoaded = useRef(false);
  const gisInited = useRef(false);
  const tokenClient = useRef(null);

  // Function to fetch events from Google Calendar
  const fetchGoogleCalendarEvents = useCallback(async () => {
    if (googleCalendarAuthStatus !== 'signed_in' || !window.gapi || !window.gapi.client || !window.gapi.client.calendar) {
        setGoogleCalendarError("Not signed in to Google Calendar or API not ready.");
        return;
    }

    setGoogleCalendarError('');
    try {
        const response = await window.gapi.client.calendar.events.list({
            'calendarId': 'primary', // 'primary' refers to the user's default calendar
            'timeMin': (new Date()).toISOString(), // Fetch events from now onwards
            'showDeleted': false, // Do not show deleted events
            'singleEvents': true, // Expand recurring events into multiple instances
            'maxResults': 20, // Limit to 20 events for demonstration
            'orderBy': 'startTime' // Order by start time
        });

        const googleEvents = response.result.items;
        if (googleEvents && googleEvents.length > 0) {
            const formattedEvents = googleEvents.map(gEvent => {
                // Determine the start date and time
                const startDateTime = gEvent.start.dateTime || gEvent.start.date;
                const endDate = gEvent.end.dateTime || gEvent.end.date;

                return {
                    id: `google-${gEvent.id}`, // Prefix with 'google-' to distinguish from local events
                    title: gEvent.summary || 'Google Event',
                    dateTime: startDateTime,
                    date: startDateTime.split('T')[0], // Extract date part for calendar day assignment
                    color: gEvent.colorId ? `#${gEvent.colorId}` : '#F6AD55', // Use Google's colorId if available, otherwise a default
                    description: gEvent.description || '',
                    isGoogleEvent: true, // Mark as a Google event
                };
            });

            setEvents(prevEvents => {
                // Filter out old Google events before adding new ones to prevent duplicates on re-sync
                const nonGoogleEvents = prevEvents.filter(e => !e.isGoogleEvent);
                return [...nonGoogleEvents, ...formattedEvents];
            });

            console.log("Fetched Google Calendar Events:", formattedEvents);
            setGoogleCalendarError('Successfully synced events from Google Calendar.');
        } else {
            setGoogleCalendarError('No upcoming events found in your Google Calendar.');
        }
    } catch (err) {
        console.error("Error fetching Google Calendar events:", err);
        setGoogleCalendarError(`Failed to fetch events from Google: ${err.message || JSON.stringify(err)}`);
    }
  }, [googleCalendarAuthStatus, setEvents]); // Re-run if auth status changes or setEvents ref changes


  // Function to initialize Google Sign-In with GIS
  useEffect(() => {
    // Load gapi.js
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      window.gapi.load('client', () => {
        window.gapi.client.init({
          apiKey: GOOGLE_API_KEY, // API Key is needed for `gapi.client.init`
          discoveryDocs: GOOGLE_DISCOVERY_DOCS,
        }).then(() => {
          gapiLoaded.current = true;
          console.log("Google API client loaded.");
          if (window.google && window.google.accounts && window.google.accounts.id) {
              handleGoogleSignInInit();
          } else {
              console.warn("Google Identity Services (GIS) not yet available. Waiting for it.");
          }
        }).catch(err => {
          console.error("Error loading Google API client:", err);
          setGoogleCalendarError(`Error loading Google API: ${err.message || 'Check network and console for details.'}`);
        });
      });
    };
    document.body.appendChild(script);

    // Load Google Identity Services (GIS) library
    const gisScript = document.createElement('script');
    gisScript.src = 'https://accounts.google.com/gsi/client';
    gisScript.onload = () => {
      gisInited.current = true;
      console.log("Google Identity Services loaded.");
      if (gapiLoaded.current) {
          handleGoogleSignInInit(); // If gapi is already loaded, initialize auth
      }
    };
    document.body.appendChild(gisScript);

    return () => {
      // Clean up scripts when component unmounts
      if (document.body.contains(script)) document.body.removeChild(script);
      if (document.body.contains(gisScript)) document.body.removeChild(gisScript);
    };
  }, []); // Empty dependency array means this runs once on mount

  // Function to initialize Google Sign-In with GIS
  const handleGoogleSignInInit = useCallback(() => {
      if (!gapiLoaded.current || !gisInited.current || tokenClient.current) {
          // Already initialized or not ready
          return;
      }

      // Initialize the token client for OAuth 2.0
      tokenClient.current = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: GOOGLE_SCOPES,
          callback: (tokenResponse) => {
              if (tokenResponse && tokenResponse.access_token) {
                  console.log('Access token obtained:', tokenResponse);
                  // Set the obtained token for gapi client to use
                  window.gapi.client.setToken(tokenResponse);
                  setGoogleCalendarAuthStatus('signed_in');
                  setGoogleCalendarError('');
                  fetchGoogleCalendarEvents(); // Call fetch events after successful sign-in
              } else {
                  console.error('Failed to obtain access token:', tokenResponse);
                  setGoogleCalendarAuthStatus('signed_out');
                  setGoogleCalendarError('Failed to sign in to Google Calendar. Check console for details.');
              }
          },
      });

      // Initially, we assume not signed in. The user will click a button to sign in.
      setGoogleCalendarAuthStatus('signed_out');
  }, [setGoogleCalendarAuthStatus, setGoogleCalendarError, fetchGoogleCalendarEvents]); // Added dependencies


  // Handles the click to initiate Google Sign-In
  const handleGoogleSignIn = useCallback(() => {
      if (!tokenClient.current) {
          setGoogleCalendarError("Google API not fully initialized. Please wait a moment and try again.");
          return;
      }
      setGoogleCalendarError('');
      // Request an access token; this will prompt the user for consent if not already granted
      tokenClient.current.requestAccessToken({ prompt: 'consent' });
  }, []);

  // Handles the click to sign out from Google Calendar
  const handleGoogleSignOut = useCallback(() => {
      if (window.google && window.google.accounts && window.google.accounts.oauth2) {
          const token = window.gapi.client.getToken();
          if (token !== null) {
              window.google.accounts.oauth2.revoke(token.access_token, () => {
                  console.log('Google token revoked.');
                  window.gapi.client.setToken(''); // Clear the token
                  setGoogleCalendarAuthStatus('signed_out');
                  setGoogleCalendarError('');
                  // Optionally clear Google events from local state here if desired
                  setEvents(prevEvents => prevEvents.filter(event => !event.isGoogleEvent));
              });
          }
      }
  }, [setEvents]);


  // Generate days for the current month
  const renderCalendarDays = useCallback(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const numDays = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month); // 0 (Sunday) to 6 (Saturday)

    const days = [];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Add weekday headers
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={`weekday-${i}`} className={`py-2 text-center font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          {weekdays[i].substring(0, 3)}
        </div>
      );
    }

    // Add empty divs for leading blank days
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={`p-2 min-h-[100px] border ${theme === 'dark' ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'} rounded-md`}></div>);
    }

    // Add days of the month
    for (let day = 1; day <= numDays; day++) {
      const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(event => event.date === fullDate);

      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
      const dayBgClass = isToday
        ? (theme === 'dark' ? 'bg-blue-800' : 'bg-blue-200')
        : (theme === 'dark' ? 'bg-gray-800' : 'bg-white');
      const dayBorderClass = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
      const dayTextColorClass = isToday
        ? (theme === 'dark' ? 'text-white' : 'text-blue-900')
        : (theme === 'dark' ? 'text-gray-200' : 'text-gray-800');

      days.push(
        <div
          key={fullDate}
          className={`p-2 min-h-[100px] border ${dayBorderClass} ${dayBgClass} rounded-md relative flex flex-col cursor-pointer transition-colors duration-200
            hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
          onDragOver={(e) => e.preventDefault()} // Allow dropping
          onDrop={(e) => handleDrop(e, fullDate)}
          onClick={() => handleAddEventClick(fullDate)} // Click to add event
        >
          <span className={`font-bold text-lg ${dayTextColorClass}`}>{day}</span>
          <div className="flex-1 overflow-y-auto mt-1 space-y-1">
            {dayEvents.map(event => (
              <div
                key={event.id}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, event.id)}
                onClick={(e) => { e.stopPropagation(); handleViewEvent(event); }} // Stop propagation to prevent day click
                className="text-xs p-1 rounded-md text-white overflow-hidden text-ellipsis whitespace-nowrap cursor-grab active:cursor-grabbing shadow-sm"
                style={{ backgroundColor: event.color }}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  }, [currentDate, events, theme, handleDrop, handleAddEventClick, handleViewEvent]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleSaveEvent = useCallback(() => {
    // Do not save if both title and description are empty
    if (!eventTitle.trim() && !eventDescription.trim()) {
      setShowEventModal(false);
      return;
    }

    if (selectedEvent) {
      // Update existing event
      setEvents(prevEvents => prevEvents.map(event => {
        if (event.id === selectedEvent.id) {
          // Note: If selectedEvent.isGoogleEvent, updating locally won't update Google Calendar.
          // For full sync, you'd need to implement gapi.client.calendar.events.update here.
          return {
            ...event,
            title: eventTitle.trim(),
            dateTime: eventDateTime,
            date: eventDateTime ? eventDateTime.split('T')[0] : event.date,
            color: eventColor,
            description: eventDescription.trim()
          };
        }
        return event;
      }));
    } else {
      // Add new event
      const newEvent = {
        id: `local-event-${Date.now()}`, // Ensure local events have a distinct ID prefix
        title: eventTitle.trim() || 'New Event',
        dateTime: eventDateTime,
        date: newEventDate, // Use the date from click
        color: eventColor,
        description: eventDescription.trim(),
        isGoogleEvent: false, // Mark as a local event
      };
      setEvents(prevEvents => [...prevEvents, newEvent]);
    }
    setShowEventModal(false);
  }, [eventTitle, eventDateTime, eventColor, eventDescription, selectedEvent, newEventDate, setEvents]);

  const handleDeleteEvent = useCallback(() => {
    if (selectedEvent) {
        // Note: If selectedEvent.isGoogleEvent, deleting locally won't delete from Google Calendar.
        // For full sync, you'd need to implement gapi.client.calendar.events.delete here.
        setEvents(prevEvents => prevEvents.filter(event => event.id !== selectedEvent.id));
        setShowEventModal(false);
        setSelectedEvent(null);
    }
  }, [selectedEvent, setEvents]);

  // Modal styling
  const modalBgClass = theme === 'dark' ? 'bg-gray-900 bg-opacity-70' : 'bg-black bg-opacity-50';
  const modalCardClass = theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800';
  const inputClass = theme === 'dark' ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500' : 'bg-gray-50 text-gray-900 border-gray-300 focus:border-blue-700';
  const buttonClass = theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' : 'bg-blue-700 hover:bg-blue-800 text-white shadow-md';
  const deleteButtonClass = 'bg-red-600 hover:bg-red-700 text-white shadow-md';

  return (
    <div className={`p-4 rounded-lg w-full max-w-7xl mx-auto flex flex-col`}>
      {/* Calendar Header */}
      <div className={`flex justify-between items-center mb-6 py-4 px-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <button
          onClick={() => navigateMonth(-1)}
          className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors duration-200`}
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-3xl font-bold">
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={() => navigateMonth(1)}
          className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors duration-200`}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Google Calendar Integration Section */}
      <div className={`mt-2 mb-6 p-4 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Google Calendar Integration</h3>
              <button
                  onClick={() => setShowInstructions(prev => !prev)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-md font-semibold text-sm transition-colors duration-200
                      ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
              >
                  <span>{showInstructions ? 'Hide Instructions' : 'Show Instructions'}</span>
                  <ChevronDownIcon size={16} className={`transition-transform duration-200 ${showInstructions ? 'rotate-180' : ''}`} />
              </button>
          </div>

          {showInstructions && (
              <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  To enable Google Calendar sync, you need to set up your Google Cloud Project:
                  <ol className="list-decimal list-inside ml-4 mt-2">
                      <li>Go to <a href="https://console.developers.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Cloud Console</a>.</li>
                      <li>Create a new project or select an existing one.</li>
                      <li>Navigate to "APIs & Services" &gt; "Library", search for "Google Calendar API" and **ENABLE** it.</li>
                      <li>Go to "APIs & Services" &gt; "Credentials":
                          <ul className="list-disc list-inside ml-4">
                              <li>Click "Create Credentials" &gt; "OAuth client ID" &gt; "Web application".</li>
                              <li>Under "Authorized JavaScript origins", add the URL where this app is hosted (e.g., `http://localhost:3000` for local development, or the exact Canvas preview URL).</li>
                              <li>Under "Authorized redirect URIs", add the same URL.</li>
                              <li>After creation, copy your `CLIENT_ID` and replace the `YOUR_GOOGLE_CLIENT_ID` placeholder in this code.</li>
                              <li>Optionally, create an "API key" if you need it for unauthenticated access to public data, and replace `YOUR_GOOGLE_API_KEY`. For user-specific calendar events, the `CLIENT_ID` (OAuth) is essential.</li>
                          </ul>
                      </li>
                      <li>Once setup, click "Connect Google Calendar" below.</li>
                  </ol>
              </p>
          )}
          <div className="flex flex-wrap items-center gap-4">
              {googleCalendarAuthStatus === 'signed_out' ? (
                  <button
                      onClick={handleGoogleSignIn}
                      disabled={!gapiLoaded.current || !gisInited.current || GOOGLE_CLIENT_ID.includes('YOUR_GOOGLE_CLIENT_ID')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold transition-colors duration-200
                          ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-700 hover:bg-blue-800 text-white'}
                          ${(!gapiLoaded.current || !gisInited.current || GOOGLE_CLIENT_ID.includes('YOUR_GOOGLE_CLIENT_ID')) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                      <Link size={20} /><span>Connect Google Calendar</span>
                  </button>
              ) : (
                  <>
                      <button
                          onClick={fetchGoogleCalendarEvents}
                          disabled={googleCalendarAuthStatus !== 'signed_in'}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold transition-colors duration-200
                              ${theme === 'dark' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-700 hover:bg-green-800 text-white'}
                              ${googleCalendarAuthStatus !== 'signed_in' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                          <RefreshCw size={20} /><span>Sync from Google</span>
                      </button>
                      <button
                          onClick={handleGoogleSignOut}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold transition-colors duration-200
                              ${theme === 'dark' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-700 hover:bg-red-800 text-white'}`}
                      >
                          <LogOut size={20} /><span>Sign Out Google</span>
                      </button>
                  </>
              )}
              {googleCalendarError && (
                  <p className="text-red-500 text-sm mt-2 w-full">{googleCalendarError}</p>
              )}
              {(!gapiLoaded.current || !gisInited.current) && (
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Loading Google API scripts...</p>
              )}
              {googleCalendarAuthStatus === 'signed_in' && (
                  <p className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                      <CheckCircle size={16} className="inline-block mr-1" /> Signed in to Google Calendar.
                  </p>
              )}
          </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 flex-grow">
        {renderCalendarDays()}
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className={`fixed inset-0 flex items-center justify-center p-4 z-50 ${modalBgClass}`}>
          <div className={`p-8 rounded-lg shadow-xl w-full max-w-md ${modalCardClass}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{selectedEvent ? 'Edit Event' : 'Add New Event'}</h3>
              <button onClick={() => setShowEventModal(false)} className={`p-1 rounded-full ${theme === 'dark' ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'}`}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveEvent(); }} className="space-y-4">
              <div>
                <label htmlFor="event-title" className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text" id="event-title"
                  className={`w-full p-2 rounded-md border ${inputClass}`}
                  value={eventTitle} onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Event Title (optional)"
                />
              </div>
              <div>
                <label htmlFor="event-datetime" className="block text-sm font-medium mb-1">Date & Time</label>
                <input
                  type="datetime-local" id="event-datetime"
                  className={`w-full p-2 rounded-md border ${inputClass}`}
                  value={eventDateTime} onChange={(e) => setEventDateTime(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="event-color" className="block text-sm font-medium mb-1">Color</label>
                <input
                  type="color" id="event-color"
                  className={`w-full h-10 p-1 rounded-md border ${inputClass} cursor-pointer`}
                  value={eventColor} onChange={(e) => setEventColor(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="event-description" className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  id="event-description" rows="3"
                  className={`w-full p-2 rounded-md border ${inputClass} resize-y`}
                  value={eventDescription} onChange={(e) => setEventDescription(e.target.value)}
                  placeholder="Event Description (optional)"
                ></textarea>
              </div>
              {selectedEvent && selectedEvent.isGoogleEvent && (
                  <p className={`text-sm ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700'}`}>
                      This is a Google Calendar event. Changes made here will NOT be synced back to Google Calendar.
                  </p>
              )}
              <div className="flex justify-end space-x-4">
                {selectedEvent && (
                  <button
                    type="button"
                    onClick={handleDeleteEvent}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold ${deleteButtonClass}`}
                  >
                    <Trash2 size={20} /><span>Delete</span>
                  </button>
                )}
                <button
                  type="submit"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold ${buttonClass}`}
                >
                  <Save size={20} /><span>Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar