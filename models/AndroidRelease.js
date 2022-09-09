export default class AndroidRelease {
    constructor({ name, version, apiLevel, distributionPercentage, cummulativeDistributionPercentage, url, descriptions }) {
        this.name = name;
        this.version = version;
        this.apiLevel = apiLevel;
        this.distributionPercentage = distributionPercentage;
        this.cummulativeDistributionPercentage = cummulativeDistributionPercentage;
        this.url = url;
        this.descriptions = descriptions;
    }
}
