export type ChatMessage = {
    type: 'user' | 'agent';
    message: string;
    cost: number;
    tokens: number;
    prompt_tokens: number;
}