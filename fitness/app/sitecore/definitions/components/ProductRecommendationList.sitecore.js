// eslint-disable-next-line no-unused-vars
import {
  CommonFieldTypes,
  Manifest,
  SitecoreIcon
} from "@sitecore-jss/sitecore-jss-manifest";

/**
 * Adds the ProductRecommendationList component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function(manifest) {
  manifest.addComponent({
    name: "ProductRecommendationList",
    fields: [
      { name: "title", type: CommonFieldTypes.SingleLineText },
      { name: "items", type: CommonFieldTypes.ContentList }
    ]
  });
}