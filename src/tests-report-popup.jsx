import React from "react"

export class TestsReportPopup extends React.Component {
  close = () => {
    this.props.testsReportActions.showDetailPopup(null)
  }

  formatDateTime = (date) => date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  });

  render() {
    const testsReport = this.props.testsReportSelectors.testsReportDetail();

    return (
      <div className="dialog-ux tests-report-detail">
        <div className="backdrop-ux" onClick={this.close}></div>
        <div className="modal-ux">
          <div className="modal-dialog-ux">
            <div className="modal-ux-inner">
              <div className="modal-ux-header">
                <h3>Test result detail</h3>
                <span>Execution time: {this.formatDateTime(testsReport.timestamp)}</span>
                <button type="button" className="close-modal" onClick={this.close}>
                  <svg width="20" height="20">
                    <use href="#close" xlinkHref="#close" />
                  </svg>
                </button>
              </div>
              <div className="modal-ux-content">
                {
                  testsReport.testCases.map((testCase, key) => {
                    return <div className="tests-report-testcase" key={key}>
                      <h4>
                        <span className={`tests-report-status tests-report-status-${testCase.status}`}>{testCase.status.toUpperCase()}</span>
                        <span>{testCase.name}</span>
                      </h4>
                      <code className="tests-report-testcase-message">{testCase.message}</code>
                    </div>
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
