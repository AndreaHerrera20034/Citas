import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import Modal from 'react-modal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';

Modal.setAppElement('#root');

export default function Calendario() {
    const localizer = dayjsLocalizer(dayjs);

    const events = [
        {
            start: dayjs('2024-07-28T04:00:00').toDate(),
            end: dayjs('2024-07-28T05:40:00').toDate(),
            title: "Cita 1"
        }
    ]
    return (
        <div className='flex flex-col items-center justify-center min-h-screen p-4'>
            <div className='w-full max-w-4xl bg-white border-4 border-gray-100 rounded-lg shadow-lg p-6'>
                <Calendar 
                    localizer={localizer}
                    events={events}
                    style={{ height: 500 }}
                />
            </div>
        </div>
    )
}
