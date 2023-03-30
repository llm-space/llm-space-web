declare module '@/config.yaml' {
  export const chatting: {
    providers: { id: string; baseServiceURL?: string }[];
    prompts: string[];
  };
}
