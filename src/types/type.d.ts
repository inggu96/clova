export interface IMessage {
    role: string;
    content: string;
}

export interface IApiResponse {
    result: {
        message: {
            content: string;
        };
    };
}
