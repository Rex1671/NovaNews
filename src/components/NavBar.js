import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const NavBar = (props) => {
    const [weather, setWeather] = useState({ temp: '--', icon: '🌤️' });
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let recognition = null;
        if (props.isListening) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.lang = 'en-US';

                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript.toLowerCase();
                    console.log("Voice Command:", transcript);

                    if (transcript.includes("home")) navigate("/");
                    else if (transcript.includes("business")) navigate("/business");
                    else if (transcript.includes("entertainment")) navigate("/entertainment");
                    else if (transcript.includes("health")) navigate("/health");
                    else if (transcript.includes("science")) navigate("/science");
                    else if (transcript.includes("sports")) navigate("/sports");
                    else if (transcript.includes("technology")) navigate("/technology");
                    else if (transcript.includes("saved") || transcript.includes("book")) navigate("/saved");
                    else if (transcript.includes("search")) {
                        const query = transcript.replace("search", "").replace("for", "").trim();
                        if (query) navigate(`/?q=${query}`);
                    }

                    props.toggleVoice(); 
                };

                recognition.onend = () => {
                    if (props.isListening) props.toggleVoice(); 
                };

                recognition.start();
            } else {
                alert("Voice not supported in this browser.");
                props.toggleVoice();
            }
        }

        return () => {
            if (recognition) recognition.stop();
        };
    }, [props.isListening]);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const lat = 40.71;
                const lon = -74.01;
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
                const data = await fetch(url);
                const parsed = await data.json();
                const temp = parsed.current_weather.temperature;
                const code = parsed.current_weather.weathercode;

                let icon = '☀️';
                if (code > 3) icon = '☁️';
                if (code > 50) icon = '🌧️';
                if (code > 70) icon = '❄️';

                setWeather({ temp, icon });
            } catch (e) {
                console.error("Weather fetch failed");
            }
        };
        fetchWeather();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchText.trim()) {
            navigate(`/?q=${searchText}`);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">
                    <span style={{ color: 'var(--primary-color)' }}>Nova</span><span style={{ color: 'var(--text-color)' }}>News</span>
                </Link>

                <div className="weather-widget d-none d-lg-flex">
                    <span className="weather-icon">{weather.icon}</span>
                    <span>{weather.temp}°C</span>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/saved" style={{ color: '#dc3545' }}>Saved ❤</Link></li>
                    </ul>

                    <div className="d-flex align-items-center">
                        <div className="form-check form-switch me-3 d-flex align-items-center">
                            <input className="form-check-input" type="checkbox" id="darkModeSwitch"
                                checked={props.mode === 'dark'} onChange={props.toggleMode} style={{ cursor: 'pointer' }} />
                            <label className="form-check-label ms-2" htmlFor="darkModeSwitch">
                                {props.mode === 'dark' ? '🌙' : '☀️'}
                            </label>
                        </div>

                        <button className={`mic-btn me-3 ${props.isListening ? 'listening' : ''}`} onClick={props.toggleVoice} title="Voice Command">
                            🎙️
                        </button>

                        <form className="d-flex" role="search" onSubmit={handleSearch}>
                            <input className="form-control me-2" type="search" placeholder="Search..." aria-label="Search"
                                value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                            <button className="btn btn-outline-primary" type="submit">🔍</button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
