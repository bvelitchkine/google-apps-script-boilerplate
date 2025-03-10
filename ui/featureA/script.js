function showFeatureAModal() {
  const html = HtmlService.createHtmlOutputFromFile(
    "ui/featureA/modal"
  ).setTitle("Feature A");
  SpreadsheetApp.getUi().showSidebar(html);
}

function loadFeatureAModalValues() {
  // Do stuff that's only useful in the modal's context
}
