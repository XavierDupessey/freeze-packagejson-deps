<script lang="ts">
    import { initialContent, fixedContent, settings } from './CoreStore';

    let textarea1: HTMLTextAreaElement;
    let textarea2: HTMLTextAreaElement;

    function syncScroll(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        textarea2.scrollTop = textarea1.scrollTop;
    }
</script>

<table>
    <thead>
        <tr>
            {#if $settings.showOriginal}<th>Original</th>{/if}
            <th>Modified</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            {#if $settings.showOriginal}
                <td><textarea readonly bind:this={textarea1} on:scroll={syncScroll}>{$initialContent}</textarea></td>
            {/if}
            <td><textarea readonly bind:this={textarea2}>{$fixedContent}</textarea></td>
        </tr>
    </tbody>
</table>

<style>
    table {
        height: 100vh;
        width: 100%;
    }

    td {
        width: 50%;
    }

    textarea {
        font-family: monospace;
        height: 100%;
        overflow-wrap: normal;
        overflow-x: scroll;
        white-space: pre;
        width: 100%;
    }
</style>
