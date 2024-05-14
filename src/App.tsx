import { ChangeEvent, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IApiResponse } from './types/type';

const App: React.FC = () => {
    const [response, setResponse] = useState<string>('');
    const [userInput, setUserInput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [displayedResponse, setDisplayedResponse] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setUserInput(e.target.value);
    };

    const fetchAPI = async (): Promise<void> => {
        setLoading(true);
        setResponse('');
        setDisplayedResponse('');
        try {
            const result: AxiosResponse<IApiResponse> = await axios({
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
        let index = 0;
        const intervalId = setInterval(() => {
            if (index < response.length) {
                setDisplayedResponse((prev) => prev + response.charAt(index));
                index++;
            } else {
                clearInterval(intervalId);
            }
        }, 50);

        return () => clearInterval(intervalId);
    }, [response]);
    return (
        <div className="w-full App">
            <div className="flex flex-col items-center justify-center h-screen gap-3 mx-auto wrap">
                <p>네이버 클로바 스튜디오 API</p>
                <div className="flex flex-row items-center justify-center gap-3">
                    <input
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        placeholder="내용을 입력해주세요"
                        className="p-2 mb-2 text-base border"
                    />

                    <button onClick={fetchAPI} className="p-2 text-base shadow-md rounded-xl">
                        보내기
                    </button>
                </div>
                <div className="max-w-4xl mx-auto">
                    {userInput}
                    {loading ? <p>Loading...</p> : <p className="text-indigo-500">{displayedResponse}</p>}
                </div>
            </div>
        </div>
    );
};

export default App;
