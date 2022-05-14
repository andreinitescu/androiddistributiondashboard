
export default async function getReleaseListAsync() {
    const data = await getRemoteDataAsync();

    const result = data.map(release => (
        { ...release, distributionPercentage: release.distributionPercentage }));

    return result;
}

async function getRemoteDataAsync() {
    const url = './data.json';

    const response = await fetch(url);
    const result = await response.json();

    return result;
}

class AndroidRelease {
    constructor({ name, version, apiLevel, distributionPercentage, url, descriptionBlocks }) {
        this.name = name;
        this.version = version;
        this.apiLevel = apiLevel;
        this.distributionPercentage = distributionPercentage;
        this.url = url;
        this.descriptionItems = descriptionBlocks;
    }
}

class AndroidReleaseDescriptionItem {
    constructor({ title, body }) {
        this.title = title;
        this.body = body;
    }
}