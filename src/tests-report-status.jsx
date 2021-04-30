import React from "react"

export class TestsReportStatus extends React.Component {
  onClick(e, testReport) {
    e.preventDefault();
    e.stopPropagation();
    this.props.testsReportActions.showDetailPopup(testReport)
  }

  render() {
    const testReport = this.props.testReport;

    return <button onClick={(e) => this.onClick(e, testReport)} className={`tests-report-status tests-report-status-${testReport.status}`}>
      {testReport.result.tests - testReport.result.errors - testReport.result.failures} / {testReport.result.tests}
    </button>
  }
}
