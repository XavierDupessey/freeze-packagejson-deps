<script lang="ts">
    import FileUpload from './FileUpload.svelte';
    import Result from './Result.svelte';
    import Settings from './Settings.svelte';
    import { areFilesSet } from './CoreStore';
</script>

<p>
    Freeze the versions of package.json dependencies using package-lock.json, for example <code>"rxjs": "~6.6.0"</code>
    will become <code>"rxjs": "6.6.3"</code>.
</p>

<p>Everything is done in the browser, no HTTP requests are sent. Your secrets are safe.</p>

<FileUpload />
<div class="settings"><Settings /></div>

{#if $areFilesSet}
    <div class="result"><Result /></div>
{/if}

<style>
    .result,
    .settings {
        margin-top: 20px;
    }
</style>
