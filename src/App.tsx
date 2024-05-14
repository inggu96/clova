import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
    const [response, setResponse] = useState('');
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [dots, setDots] = useState('');

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const fetchAPI = async () => {
        setLoading(true);
        try {
            const result = await axios({
                method: 'post',
                url: '/api/testapp/v1/chat-completions/HCX-003',
                headers: {
                    'X-NCP-CLOVASTUDIO-API-KEY': 'NTA0MjU2MWZlZTcxNDJiY1+01zMgbyATcwP+rs0s/EaUldNObaujJk7r9ni7ql0Q',
                    'X-NCP-APIGW-API-KEY': 'lB0VXJfaT1KKBr4yBxQFrEIsvbyOecCTMO43TWLh',
                    'X-NCP-CLOVASTUDIO-REQUEST-ID': '8c043dc6-2209-4948-87c8-584537369292',
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                data: {
                    messages: [
                        {
                            role: 'user',
                            content: userInput,
                        },
                    ],
                    topP: 0.8,
                    maxTokens: 256,
                    temperature: 0.5,
                },
            });
            setTimeout(() => {
                setLoading(false);
                setResponse(result.data.result.message.content);
                console.log('data', result.data.result.message.content);
            }, 3000);
        } catch (error) {
            console.error('There was an error!', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        let timer;
        if (loading) {
            timer = setInterval(() => {
                setDots((dots) => (dots.length < 4 ? dots + 'O' : ''));
            }, 500);
        } else {
            setDots('');
        }
        return () => clearInterval(timer);
    }, [loading]);
    return (
        <div className="App">
            <header className="App-header">
                <div className="wrap">
                    <p>Response from Clova API:</p>
                    <input
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        placeholder="Enter your request"
                        style={{ padding: '10px', fontSize: '16px', marginBottom: '10px' }}
                    />
                    <button onClick={fetchAPI} style={{ padding: '10px 20px', fontSize: '16px' }}>
                        Submit Request
                    </button>
                    {loading ? <p className="loading-dot">{dots}</p> : <p className="typing">{response}</p>}
                </div>
            </header>
        </div>
    );
};

export default App;
