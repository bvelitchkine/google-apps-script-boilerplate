// GLOBAL VARIABLES HERE
// const START_SHEET = "Pharow";
// const IN_SALESFORCE_SHEET = "Leads [Déjà Dans Salesforce]";
// const DEDUPLICATION_SHEET = "Salesforce Deduplication";
// const ONGOING_ENRICHMENT_SHEET = "Enrichissement en Cours";
// const LEADS_WITH_CONTACT_INFO_SHEET = "Leads [Contact]";
// const LEADS_WITHOUT_CONTACT_INFO_SHEET = "Leads [Sans Contact]";

/**
 * Handles POST requests to the web app.
 * @param {!Object} e The event object containing the request data.
 * @return {!ContentService.TextOutput} A text response indicating the result of the operation.
 */
function doPost(e) {
  console.log("To process post requests to the project")
}

/**
 * Creates the custom menu in the Google Sheets UI.
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("Automation")
    .addItem(
      "Feature A",
      "doFeatureA"
    )
    .addItem("Feature B", "doFeatureB")
    .addToUi();
}
