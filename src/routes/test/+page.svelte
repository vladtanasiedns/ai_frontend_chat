<script>
    let name = 'world';
</script>

<input type="text" bind:value={name}>
<button on:click={() => {
    name = '';
}}>Reset</button>