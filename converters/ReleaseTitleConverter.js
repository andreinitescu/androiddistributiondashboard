export default class ReleaseTitleConverter {
    static convert(release) {
        return `${release.name} - Android ${release.version} (API ${release.apiLevel})`;
    }
}