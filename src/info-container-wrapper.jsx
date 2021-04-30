export const InfoContainerWrapper = (Original, { React, getComponent }) => class TestReportPopupContainer extends React.Component {
  render() {
    const showDetails = this.props.testsReportSelectors.testsReportDetail();
    const TestsReportPopup = getComponent("TestsReportPopup", true)

    return <div>
      <Original {...this.props} />
      {showDetails ? <TestsReportPopup {...this.props} /> : null}
    </div >
  }
}
