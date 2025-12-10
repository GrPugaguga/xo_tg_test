interface TelegramWebApp {
    ready(): void;
    expand(): void;
    close(): void;
    initData: string;
    initDataUnsafe: {
        query_id?: string;
        user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            is_premium?: boolean;
            added_to_attachment_menu?: boolean;
            allows_write_to_pm?: boolean;
        };
        receiver?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            is_bot?: boolean;
        };
        chat?: {
            id: number;
            type: 'sender' | 'private' | 'group' | 'supergroup' | 'channel';
            title: string;
            username?: string;
            photo_url?: string;
        };
        auth_date: number;
        hash: string;
        start_param?: string;
    };
    onEvent(eventType: string, callback: (...args: any[]) => void): void;
    offEvent(eventType: string, callback: (...args: any[]) => void): void;
    sendData(data: string): void;
}

interface Window {
    Telegram?: {
        WebApp: TelegramWebApp;
    };
}
