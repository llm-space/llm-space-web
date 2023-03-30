declare module '@/config.yaml' {
  export const chatspace: {
    providers: { id: string; baseServiceURL?: string }[];
    prompts: string[];
  };
}
