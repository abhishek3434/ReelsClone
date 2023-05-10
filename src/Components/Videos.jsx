import React from 'react';
import '../Style/post.css'
import  ReactDOM  from 'react-dom';

const Videos = ({url,scrollNext}) => {
    const handleClick=(e)=>{
        e.preventDefault()
        e.target.muted=!e.target.muted
    }
    const handleScroll=(e)=>{
        let next=ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
        if(next){
            next.scrollIntoView()
            e.target.muted=true
        }
    }
    
    return (
        
        scrollNext === true?
        <video src={url} autoPlay={true} onEnded={handleScroll} className='video-styling' muted='muted' onClick={handleClick} >
        </video>:<video src={url} autoPlay={true} className='modal-video-styling' muted='muted' onClick={handleClick} >
        </video>
    );
};

export default Videos;