
function FeedEntryTime({time}) {
    let dateString = null;
    const dateEpoch = Date.parse(time);
    if (dateEpoch && dateEpoch == NaN) {
	dateString = time;
    }
    else {
	const now = new Date();
	const dateObj = new Date(dateEpoch);
	dateString = dateObj.toDateString();
	dateString = timePassed(now.valueOf() - dateEpoch, dateString);
    }
    return (
      <div className="time">{dateString}</div>
    );
}

function timePassed(time, dateString) {
    const S = 1000,M=60,H=60,D=24,W=7,Mo=4.34,Y=12;
    const t=new Array(S,M,H,D,W,Mo,Y)

    const pref = 'about';
    const sufensg = new Array('second ago','minute ago','hour ago','day','week ago','month ago','year ago');
    const sufenpl = new Array('seconds ago','minutes ago','hours ago','days ago','weeks ago','months ago','years ago');

    let qty = time / t[0];
    for (let i=1; i<=t.length; i++) {
	if (qty < t[i]) {
	    let suf = null;
	    let qtyStr = null;
	    if (Math.round(qty) == 1) {
		qtyStr = 'a';
		suf = sufensg[i-1];
	    }
	    else {
		qtyStr = Math.round(qty).toString();
		suf = sufenpl[i-1];
	    }
	    return pref + ' ' + qtyStr + ' ' + suf;
	}
	qty = qty / t[i];
    }
    return dateString;
}

export default FeedEntryTime;
