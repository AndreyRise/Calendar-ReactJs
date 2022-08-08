import React,{useEffect, useState} from 'react'
import lupa from '../imgs/Vector.png'
import btnLeft from '../imgs/button-icon-left.png'
import btnRight from '../imgs/button-icon-right.png'
import * as moment from 'moment';
import 'moment/locale/ru';
import { Link } from 'react-router-dom'
import '../index.css'


const Calendar = () => {
  const weekDays = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];
  const [today,setToday] = useState(moment());
  const startDay = today.clone().startOf('month').startOf('week');
  const [calendar, setCalendar] = useState([]);
  const [popup, setPopup] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventParticipants, setEventParticipants] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventsChanged, setEventsChanged] = useState(false);

  useEffect( () => {
    const day = startDay.clone().subtract(1,'day');
    const daysArray = [...Array(42)].map(() => day.add(1,'day').clone());
    setCalendar(daysArray);
  }, [today]);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem('eventsData', JSON.stringify(eventsData));
    }, 100);
    setEventsChanged(false);
    calendar.map((dayItem)=>{
      const el = document.getElementById(dayItem.format('DD-MM-YYYY'));
      el.classList.remove('filledCell');
    })
    eventsData.map((eventItem) => {
      const el = document.getElementById(eventItem.date);
      el.classList.add('filledCell');
    })
  }, [eventsChanged])
  

  useEffect(() => {
    const storageEventsData = JSON.parse(localStorage.getItem('eventsData'));
    if (storageEventsData) {
      setEventsData(storageEventsData);
    }
  }, [])
  
  
  const prevHandler = () => {
    setToday(today.clone().subtract(1,'month'));
  };
  const todayHandler = () => {
    setToday(moment())
  };
  const nextHandler = () => {
    setToday(today.clone().add(1,'month'));
  };

  const clearEventVars = () => {
    setEventTitle(''); 
    setEventDate(''); 
    setEventParticipants(''); 
    setEventDescription('');
  }

  const catchEventData = (dateOfEvent) => {
    setEventDate(dateOfEvent);
    if(dateOfEvent){
      const cellData = eventsData.find(item => item.date===dateOfEvent);
      if (cellData?.title) setEventTitle(cellData.title);
      if (cellData?.participants) setEventParticipants(cellData.participants);
      if (cellData?.description) setEventDescription(cellData.description);
    }
  };

  return (
    <>
    {popup &&
      <div id='popup' className='absolute flex items-center justify-center h-screen bg-black/25 w-full z-10'>
        <div className='flex w-[300px] h-[315px] bg-white rounded-sm z-15 p-[12px] flex-col'>
          <div className='flex w-full h-[12px] justify-end mb-[9px]'><span onClick={()=>{setPopup(false);clearEventVars()}}  className='hover:cursor-pointer leading-3 text-[18px] scale-y-[0.7]'>x</span></div>
            <div className='flex flex-col gap-y-[8px] mb-[24px]'>
              <input className='rounded-sm h-[28px] outline-none border-2 py-[6px] pl-[12px] placeholder:text-[15px]' value={eventTitle} onChange={e=>{setEventTitle(e.target.value)}} placeholder='Событие' type="text" />
              <input className='rounded-sm h-[28px] outline-none border-2 py-[6px] pl-[12px] placeholder:text-[15px]' disabled={true} value={eventDate} onChange={e=>{setEventDate(e.target.value)}} placeholder='День, Месяц, Год' type="text" />
              <input className='rounded-sm h-[28px] outline-none border-2 py-[6px] pl-[12px] placeholder:text-[15px]' value={eventParticipants} onChange={e=>{setEventParticipants(e.target.value)}} placeholder='Имена участников' type="text" />
            </div>
            <div className='flex flex-col gap-y-[8px] h-full'>
              <textarea name="" value={eventDescription} onChange={e=>{setEventDescription(e.target.value)}} maxLength={110} className='resize-none rounded outline-none border-2 placeholder:text-[15px] py-[6px] px-[12px] w-full' id=""  rows='4' placeholder='Описание'></textarea>
              <div className='flex gap-x-[20px]'>
                <input style={{boxShadow: 'inset 0px 0px 1px 1px rgba(0, 0, 0, 0.25)'}} type="button" onClick={()=>{
                  if(Boolean(eventTitle) && Boolean(eventDate) && Boolean(eventParticipants)){
                    const newEvent = {
                      date: eventDate,
                      title: eventTitle,
                      participants: eventParticipants,
                      description: eventDescription
                    }
                    if (eventsData.some((e => e.date === newEvent.date))){
                      const createdEvent = eventsData.find(element => element.date === eventDate);
                      if(createdEvent.title !== eventTitle || createdEvent.participants !== eventParticipants){
                        let oldEventsData = eventsData;
                        const eventIndex = oldEventsData.indexOf(createdEvent);
                        oldEventsData.splice(eventIndex, 1);
                        oldEventsData.push(newEvent);
                        setEventsData(oldEventsData);
                        setEventsChanged(true);
                      }
                    }
                    else {
                      setEventsData(prev => [...prev,newEvent]);
                      setEventsChanged(true);
                    }
                    clearEventVars();
                    setPopup(false);
                  }
                  else alert('Поля Событие, Дата и Участики обязательны для заполнения!');
                }} value='Готово' className='hover:cursor-pointer rounded px-[6px]'/>
                <input style={{boxShadow: 'inset 0px 0px 1px 1px rgba(0, 0, 0, 0.25)'}} type="button" value='Удалить' onClick={()=>{
                  if (eventsData.some((e => e.date === eventDate))){
                    const createdEvent = eventsData.find(element => element.date === eventDate);
                    let oldEventsData = eventsData;
                    const eventIndex = oldEventsData.indexOf(createdEvent);
                    oldEventsData.splice(eventIndex, 1);
                    setEventsData(oldEventsData);
                    setPopup(false);
                    setEventsChanged(true);
                    clearEventVars();
                  }
                  else alert('Удалять нечего!')
                }} className='hover:cursor-pointer rounded px-[6px]'/>
              </div>
            </div>
        </div>
      </div>
    }
    <header className='flex h-[100px] w-full bg-[#F4F4F4] justify-center '>
      <div className='flex justify-between w-[1024px] items-end pb-[21px] px-[12px]'>
        <Link to="/" className="absolute flex font-sans text-white text-[14px] h-[28px] w-[165px] bg-[#0271C7] items-center justify-center rounded-sm  cursor-pointer top-3">
            На главную
        </Link>
        <div>
          <button className='rounded-sm text-white bg-[#0271C7] font-sans px-[12px] leading-4 py-[6px] text-[12px] mr-[10px]'>Добавить</button>
          <button onClick={()=>{}} className='rounded-sm text-white bg-[#0271C7] font-sans px-[12px] leading-4 py-[6px] text-[12px]'>Обновить</button>
        </div>
        <div className='flex items-center'>
          <img className='w-[20px] h-[20px] mr-[20px] hover:cursor-pointer' src={lupa} alt="" />
          <input className='rounded-sm h-[28px] outline-none border-2 py-[6px] pl-[12px] placeholder:text-[12px] placeholder:' placeholder='Событие, дата или участник' type="text" />
        </div>
      </div>
    </header>
    <div className="flex w-full justify-center">
      <div className='flex flex-col items-center w-[1024px] px-[11px]'>
        <div className='flex h-[48px] w-full items-center'>
          <div className='flex items-center mr-[10px]'>
            <img onClick={() => {prevHandler()}} className='hover:cursor-pointer' src={btnLeft} alt="Пред. месяц" />
            <div className='flex justify-center w-[156px]'>
              <span className='text-[18px] font-[500]'>{today.format('MMMM YYYY')}</span>
            </div>
            <img onClick={() => {nextHandler()}} className='hover:cursor-pointer' src={btnRight} alt="След. месяц" />
          </div>
          <span onClick={() => {todayHandler()}} style={{boxShadow: 'inset 0px 0px 1px 1px rgba(0, 0, 0, 0.25)'}} className='flex items-center rounded h-[18px] px-[6px] hover:cursor-pointer text-[12px]'>Сегодня</span>
        </div>
        <div className='grid grid-rows-4 grid-cols-7 gap-[1px] bg-[#6B6B6B] border-[1px] border-[#6B6B6B]'>
          {
            calendar.map((dayItem, index) => (
              <div id={dayItem.format('DD-MM-YYYY')} className={'relative min-w-[142px] min-h-[120px] bg-white p-[8px] text-[14px] text-[#6B6B6B] hover:cursor-pointer cellActive flex flex-col gap-y-[6px]'}
               key={dayItem.format('DD-MM-YYYY')}
               onClick={()=>{
                catchEventData(dayItem.format('DD-MM-YYYY'));
                setPopup(true);
               }}
              >
                <span id='calendarDate' className=''>
                  {weekDays[index] && <span>{weekDays[index]}, </span>}
                  {dayItem.format('D')} 
                  <span> </span>
                </span>
                {
                  eventsData.map((data)=>(<>
                    {data.date===dayItem.format('DD-MM-YYYY')?<span className='text-black' id='eventName'>{data.title} </span>:<></>}
                    {data.date===dayItem.format('DD-MM-YYYY')?<span id='eventDesc'>{data.participants}</span> :<></>}
                    </>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default Calendar