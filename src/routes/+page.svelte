<script lang="ts">
    import ChatMessage from "../components/ChatMessage.svelte";
    import type { ChatMessage as ChatMessageType } from "../types";
    import axios from "axios";
    import { onMount } from "svelte";

    const url = "http://localhost:8000/chat/";

    $: loading = false;
    let userMessage = '';
    const userMessages: string[] = [];
    const agentMessages: ChatMessageType[] = [];
    $:messages = [...agentMessages, ...userMessages];

    let chatContainer: HTMLDivElement;
    
    const messageAgent = async (message: string) => {
        userMessages.push(message);
        loading = true;
        const response = await axios.post(url, { message });
        const agentSays: ChatMessageType = {
            type: 'agent',
            ...response.data
        }
        agentMessages.push(agentSays);
        loading = false;
        message = '';
        console.log(response.data)
        console.log(agentMessages)
        messages = [...agentMessages, ...userMessages];
        return response.data;
    };
    
    onMount(() => {
      console.log('messages changed') 
      console.log(messages)
    });

</script>

<!-- Main container -->
<div class="grid gap-4 grid-cols-1 grid-rows-4 justify-center items-center h-screen bg-slate-400" bind:this={chatContainer}>
    <!-- Chat -->
    {#if loading}
        <div class="flex justify-center items-center h-full row-span-3">
            <div class="loader"></div>
        </div>
    {:else}
    <div class="flex flex-col-reverse items-center align-middle h-full row-span-3">
        <!-- Latest message is on top -->
        {#each messages as message}
            <ChatMessage message={message}/>
        {/each} 
    </div>
    {/if}

    <!-- User input -->
    <div class="relative flex justify-center items-center w-1/3 mx-auto {loading ? 'pointer-events-none' : 'pointer-events-auto'}">
        <input 
            type="text" 
            class="w-3/5 resize-none border border-slate-300 focus:border-slate-600 focus:ring-slate-600 focus:outline-none rounded-md p-2 pr-10 {loading ? 'bg-gray-200:' : 'bg-slate-200'}" 
            placeholder="Ask something"
            bind:value={userMessage}
            on:keydown={async (event) => {
                if (event.key === "Enter") {
                    await messageAgent(userMessage);
                }
            }}
        />
        <div>    
            <svg 
            on:click={async () => await messageAgent(userMessage)}
            on:keydown={() => ''}
            class="absolute left-3/4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
        </div>
    </div>
</div>

<style>
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .loader {
        border: 4px solid #f3f3f3; /* Set the border color */
        border-top: 4px solid #3498db; /* Set the color of the animated part */
        border-radius: 50%; /* Make it round */
        width: 40px; /* Set the width and height */
        height: 40px;
        animation: spin 1s linear infinite; /* Apply the spinning animation */
    }
</style>
