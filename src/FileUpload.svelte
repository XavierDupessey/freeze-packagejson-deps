<script lang="ts">
    import { files } from './CoreStore';

    let input: HTMLInputElement;
    let dragging = false;
    let error = false;

    function onDragOver(e: DragEvent): void {
        e.preventDefault();
        dragging = true;
    }

    function onDragLeave(): void {
        dragging = false;
    }

    function onDrop(e: DragEvent): void {
        e.preventDefault();
        dragging = false;
        handleFiles(e.dataTransfer.files);
    }

    function onFileChange(e: Event): void {
        handleFiles(input.files);
        input.value = '';
    }

    function onClick(): void {
        input.click();
    }

    function handleFiles(fileList: FileList): void {
        const uploadedFiles = Array.from(fileList);
        const filesName = uploadedFiles.map((file) => file.name);

        if (
            uploadedFiles.length !== 2 ||
            !filesName.includes('package.json') ||
            !filesName.includes('package-lock.json')
        ) {
            error = true;
            return;
        }

        error = false;
        files.set({
            package: uploadedFiles.find((file) => file.name === 'package.json'),
            packageLock: uploadedFiles.find((file) => file.name === 'package-lock.json'),
        });
    }
</script>

<input type="file" class="input" multiple={true} accept=".json" bind:this={input} on:change={onFileChange} />

<div
    class="drop-zone"
    class:active={dragging}
    on:click={onClick}
    on:dragover={onDragOver}
    on:dragleave={onDragLeave}
    on:drop={onDrop}
>
    Drop your package.json and package-lock.json files here
</div>

{#if error}
    <div class="error">Invalid files</div>
{/if}

<style>
    .input {
        display: none;
    }

    .drop-zone {
        align-items: center;
        background-color: rgb(236, 236, 236);
        border-radius: 10px;
        border: 2px dashed gray;
        display: flex;
        justify-content: center;
        min-height: 100px;
        padding: 20px;
    }

    .drop-zone:hover,
    .drop-zone.active {
        background-color: lightgray;
        border-color: black;
    }

    .error {
        color: red;
    }
</style>
