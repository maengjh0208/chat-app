export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isSent: boolean;
}

export interface ChatSession {
  id: string;
  participants: string[];
  messages: Message[];
}
