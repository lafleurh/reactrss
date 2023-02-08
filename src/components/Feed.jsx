
import { useState, useEffect } from 'react';
import FeedEntryTime from './FeedEntryTime.jsx';

function Feed({rss})  {
	const [index, setIndex] = useState(0);
	const [pauseAnimation, setPauseAnimation] = useState(false);

	const animate = () => {
		if (!pauseAnimation)
			setIndex((i) => {
				if (i + 1 >= rss.items.length)
					return (0);
				else
					return (i + 1);
			});
	};

	useEffect(() => {
		const newInterval = setInterval(animate, 4000);
		return () => clearInterval(newInterval);
	}, [rss, pauseAnimation])

	const pauseTheAnimation = () => setPauseAnimation(true);
	const resumeTheAnimation = () => setPauseAnimation(false);

    const mapItem = (item, itemIndex) => {
		const itemDisplay = itemIndex === index ? 'block' : 'none';
		return (
	<div className="title" key={item.link} style={{display: itemDisplay}}
		onMouseEnter={pauseTheAnimation} onMouseLeave={resumeTheAnimation}>
	  {item.title}
	    <FeedEntryTime time={item.entryDate}/>
	    <div className="a"></div>
	    <div className="resume" dangerouslySetInnerHTML={{ __html: item.description._}}></div>
	    <div className="link"><br/><a href={item.link} target="_blank" rel="noreferrer">Read More</a></div>
	    <div className="b"></div>
	</div>
    );};
    
    return (
      <div className="feed">
	{rss.items.map(mapItem)}
      </div>
    );	    
}

export default Feed;
