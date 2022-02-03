<script lang="ts">
    import { settings } from './CoreStore';
</script>

<label><input type="checkbox" bind:checked={$settings.freezeDeps} />Deps</label>
<label><input type="checkbox" bind:checked={$settings.freezeDevDeps} />Dev deps</label>
<label><input type="checkbox" bind:checked={$settings.freezePeerDeps} />Peer deps</label>
<label><input type="checkbox" bind:checked={$settings.showOriginal} />Show original file</label>

<style>
    input {
        margin-right: 5px;
    }

    label {
        display: inline-block;
        margin-right: 10px;
    }
</style>
