<script lang="ts">
    import type { ChatMessage } from "../types";

    export let message: ChatMessage | string;
</script>

<div class="w-full text-gray-200">
    {#if typeof message === 'string'}
    <div class="bg-gray-600 w-full flex flex-col items-center">
        <p>User: {message}</p>
    </div>
    {:else}
    <div class="bg-slate-800 w-full flex flex-col items-center">
        <p>{message.type.toUpperCase()}:</p>
        <p>{message.message}</p>
        <p>Cost: {message.cost}</p>
        <p>Tokens: {message.tokens}</p>
        <p>Prompt tokens: {message.prompt_tokens}</p>
    </div>
    {/if}
</div>