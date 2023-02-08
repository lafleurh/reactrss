import React, { useState, useEffect } from 'react';
import Feed from './Feed.jsx';
import './rssfeed.css';

/**
 * Create an RSS feed react component backed by a JSON service that works 
 * like https://github.com/lafleurh/rss2jsonfn <br/><br/>
 * @param {{url: string; width: number;}} param <br/>
 * @returns A React RSS Feed Component
 */
function RssFeed({url, width}) {
    const [rss, setRss] = useState();
    const [err, setErr] = useState('');

    useEffect(() => {
	fetch(url)
	    .then(data => data.json())
	    .then(setRss)
	    .catch(setErr);
    }, [url]);

    if (err) {
	return (
		<div>{err.message}</div>
	);
    }
    else if (rss) {
	let link = null;
	if (rss.link) {
	    // Title with link
	    link = (
		    <div className="titre"><a href={rss.link} target="_blank" rel="noreferrer">{rss.title}</a></div>
	    );
	}
	else {
	    // Title only
	    link = (
		<div className="titre">{rss.title}</div>
	    );
	}
	return (
	    <div className="feed" style={{width: width}}>
		{link}
		<Feed rss={rss}/>
	    </div>
	);
    }
    else {
	return (
		<div className="loading">Loading...</div>
	);
    }
}

export default RssFeed;
