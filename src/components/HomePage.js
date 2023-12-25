import React, {useRef, useState} from 'react'
import { FaPlay, FaPause, FaUndo  } from "react-icons/fa";
import { LuClock3 } from "react-icons/lu";
import Navbar from './Navbar'
import { Link } from "react-router-dom";

export default function HomePage() {
  const [playing, setPlaying] = useState(false);
  const vidRef = useRef(null);
  const handlePlayVideo = () => {
    vidRef.current.play();
    setPlaying(true);
  }
  const handlePauseVideo = () => {
    vidRef.current.pause();
    setPlaying(false);
  }
  const handleReplayVideo = () => {
    vidRef.current.currentTime = 0;
  }
  return (
    <div className='home'>
      <Navbar />
      <div className='landing'>
        <div className='videoBox'>
          {!playing ? <div className='playButton' onClick={() => handlePlayVideo()}>
            <FaPlay className='playIcon' />
            <p>Watch Video</p>
          </div> :
          <div className="videoControls">
            <FaPause className='pauseIcon' onClick={() => handlePauseVideo()} />
            <FaUndo className='replayIcon' onClick={() => handleReplayVideo()} />
          </div>
          }
          <video className='video' ref={vidRef} >
            <source src="https://40parables-assets.s3.amazonaws.com/bleat-AI-PulseCheck-Intro.mp4" type="video/mp4"/>
          </video>
        </div>
        <div className="contentBox">
          <h1> <span className='primary'>Is your church embracing impact</span> or AI* hesitant?</h1>
          <ol>
            <li>Take this 3-minute assessment</li>
            <li>Invite your team to take it too after you do</li>
            <li>View everyone's results on 1 dashboard</li>
            <li>Align on the best next step for your church's approach to AI</li>
          </ol>
          <div className='actions'>
            <Link to={'/assessment'}><button><h2>GET STARTED</h2></button></Link>
            <div className='timing'>
              <LuClock3 />
              <h3>3 min</h3>
            </div>
          </div>
          <p className='referrence'>*Artificial Intelligence</p>
          <p className='footer'>
           <b>If you aren't a Senior/Lead/Executive Pastor,</b> please ask one of them on your team to first take this test - ctt1.bleat.church. That test's result will generate a team link so you and other team members can then take this same test afterward as a team.
          </p>
        </div>
      </div>

    </div>
  )
}
