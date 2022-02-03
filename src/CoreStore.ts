import { derived, writable, Writable } from 'svelte/store';

export interface Files {
    package: File;
    packageLock: File;
}

export interface Settings {
    freezeDeps: boolean;
    freezeDevDeps: boolean;
    freezePeerDeps: boolean;
    showOriginal: boolean;
}

export const files: Writable<Files> = writable();

export const settings: Writable<Settings> = writable({
    freezeDeps: true,
    freezeDevDeps: true,
    freezePeerDeps: false,
    showOriginal: false,
});

export const areFilesSet = derived(files, ($files) => !!$files);

export const initialContent = derived(files, async (files, set) => {
    if (!files.package) {
        return;
    }

    const content = JSON.parse(await files.package.text());
    set(JSON.stringify(content, null, 2));
});

export const fixedContent = derived([files, settings], async ([files, settings], set) => {
    if (!files) {
        return;
    }

    const packageContent = JSON.parse(await files.package.text());
    const packageLockContent = JSON.parse(await files.packageLock.text());

    const packageLockVersions = new Map<string, string>();
    Object.entries(packageLockContent.dependencies).forEach((entry: [string, any]) =>
        packageLockVersions.set(entry[0], entry[1].version)
    );

    [
        settings.freezeDeps ? 'dependencies' : null,
        settings.freezeDevDeps ? 'devDependencies' : null,
        settings.freezePeerDeps ? 'peerDependencies' : null,
    ]
        .filter(Boolean)
        .forEach((property) => {
            if (!packageContent[property]) {
                return;
            }

            packageContent[property] = processDeps(packageContent[property], packageLockVersions);
        });

    set(JSON.stringify(packageContent, null, 2));
});

const processDeps = (deps: Record<string, string>, fixedVersions: Map<string, string>): Record<string, string> => {
    if (!deps) {
        return null;
    }

    const versions = new Map<string, string>();

    Object.keys(deps).forEach((packageJsonDep: any) =>
        versions.set(packageJsonDep, fixedVersions.get(packageJsonDep) || deps[packageJsonDep])
    );

    return Object.fromEntries(versions);
};
