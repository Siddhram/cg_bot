import React, { useState } from 'react'
import "./App.css"
import { IoCodeSlash, IoSend } from 'react-icons/io5'
import { BiPlanet } from 'react-icons/bi'
import { FaPython } from 'react-icons/fa'
import { TbMessageChatbot } from 'react-icons/tb'
import axios from 'axios';

const App = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]); 

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    } else {
      alert("You must write something...!");
    }
  };

  const generateResponse = async (msg) => {
    if (!msg) return;

    try {
      const response = await axios.post('https://jsgemiintegration.onrender.com/history', {
        sessionId: "siddharamsutar23@gmail.com",
        prompt: msg,
      });
      
      const newMessages = [
        ...messages,
        { type: "userMsg", text: msg },
        { type: "responseMsg", text: response.data.response },
      ];
      
      setMessages(newMessages);
      setisResponseScreen(true);
      setMessage("");
      console.log(response.data.response);
    } catch (error) {
      console.error("Error generating response:", error);
      alert("There was an error generating the response. Please try again.");
    }
  };

  const newChat = () => {
    setisResponseScreen(false);
    setMessages([]);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      hitRequest();
    }
  };

  return (
    <>
      <div className="container w-screen min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white">
        {
          isResponseScreen ? (
            <div className='h-[80vh]'>
              <div className="header pt-[25px] flex items-center justify-between w-[100vw] px-[300px]">
                <h2 className='text-2xl'>AssistMe</h2>
                <button id='newChatBtn' className='bg-[#181818] p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px]' onClick={newChat}>New Chat</button>
              </div>

              <div className="messages">
                {messages.map((msg, index) => (
                  <div key={index} className={msg.type}>{msg.text}</div>
                ))}
              </div>
            </div>
          ) : (
            <div className="middle h-[80vh] flex items-center flex-col justify-center">
              <h1 className='text-4xl'>AssistMe</h1>
              <div className="boxes mt-[30px] flex items-center gap-2">
                <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                  <p className='text-[18px]'>What is coding ? <br /> How we can learn it.</p>
                  <i className='absolute right-3 bottom-3 text-[18px]'><IoCodeSlash /></i>
                </div>
                <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                  <p className='text-[18px]'>Which is the red <br /> planet of solar <br /> system </p>
                  <i className='absolute right-3 bottom-3 text-[18px]'><BiPlanet /></i>
                </div>
                <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                  <p className='text-[18px]'>In which year python <br /> was invented ?</p>
                  <i className='absolute right-3 bottom-3 text-[18px]'><FaPython /></i>
                </div>
                <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                  <p className='text-[18px]'>How we can use <br /> the AI for adopt ?</p>
                  <i className='absolute right-3 bottom-3 text-[18px]'><TbMessageChatbot /></i>
                </div>
              </div>
            </div>
          )
        }

        <div className="bottom w-[100%] flex flex-col items-center">
          <div className="inputBox w-[60%] text-[15px] py-[7px] flex items-center bg-[#181818] rounded-[30px]">
            <input 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              onKeyDown={handleKeyDown}
              type="text" 
              className='p-[10px] pl-[15px] bg-transparent flex-1 outline-none border-none' 
              placeholder='Write your message here...' 
              id='messageBox' 
            />
            {message && <i className='text-green-500 text-[20px] mr-5 cursor-pointer' onClick={hitRequest}><IoSend /></i>}
          </div>
          <p className='text-[gray] text-[14px] my-4'>AssistMe is developed by Mo. Mahdi Farooqui. This AI uses the Gemini API for generating responses.</p>
        </div>
      </div>
    </>
  );
}

export default App;
