export default class AndroidRelease {
    constructor({ name, version, apiLevel, distributionPercentage, url, descriptions }) {
        this.name = name;
        this.version = version;
        this.apiLevel = apiLevel;
        this.distributionPercentage = distributionPercentage;
        this.url = url;
        this.descriptions = descriptions;
    }
}
