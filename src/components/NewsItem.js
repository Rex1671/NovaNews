import React, { useState } from 'react'

const NewsItem = (props) => {
  const { title, description, imageUrl, newsUrl, author, date, source } = props;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSaved, setIsSaved] = useState(() => {
    const saved = localStorage.getItem('savedNews');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.some(item => item.url === newsUrl);
    }
    return false;
  });

  const words = (description + " " + title).split(" ").length;
  const readTime = Math.ceil(words / 200);

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(`${title}. ${description}`);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleSave = () => {
    let saved = JSON.parse(localStorage.getItem('savedNews') || "[]");
    if (isSaved) {
      saved = saved.filter(item => item.url !== newsUrl);
      setIsSaved(false);
    } else {
      saved.push({ title, description, imageUrl, newsUrl, author, date, source });
      setIsSaved(true);
    }
    localStorage.setItem('savedNews', JSON.stringify(saved));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: newsUrl,
        });
      } catch (err) {
        console.log("Share failed", err);
      }
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  return (
    <div className="my-3">
      <div className="card h-100">
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
          <span className="badge rounded-pill bg-danger" style={{ zIndex: '1', left: '90%' }}>
            {source}
          </span>
        </div>

        <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl}
          className="card-img-top" alt="..." style={{ height: "200px", objectFit: "cover" }} />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="reading-time">⏱ {readTime} min read</span>
            <div className="btn-group">
              <button className="btn btn-sm btn-outline-secondary" onClick={handleSpeak} title="Listen">
                {isSpeaking ? '🔇' : '🔊'}
              </button>
              <button className={`btn btn-sm ${isSaved ? 'btn-danger' : 'btn-outline-danger'}`} onClick={handleSave} title="Save">
                {isSaved ? '❤' : '🤍'}
              </button>
              <button className="btn btn-sm btn-outline-primary" onClick={handleShare} title="Share">
                📤
              </button>
            </div>
          </div>

          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>

          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary mt-auto">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem
