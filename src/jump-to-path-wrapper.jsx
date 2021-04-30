export const JumpToPathWrapper = (Original, { React }) => class TestReportStatusContainer extends React.Component {
  constructor(props, context) {
    super(props, context)

    // JumpToPath is used at multiple places, so we have to detect the context
    let displayedIn = 'schema';
    if (props.path) {
      if (Array.isArray(props.path) && props.path[0] === 'securityDefinitions') {
        displayedIn = 'auth'
      } else if (typeof props.path === 'object' && props.path && props.path.get(0) === 'paths') {
        displayedIn = 'path'
      }
    }

    this.state = {
      displayedIn: displayedIn,
    }
  }

  render() {
    if (this.state.displayedIn === 'path') {
      return this.renderInPath();
    }
    return <Original {...this.props} />
  }

  renderInPath() {
    const testsReport = this.props.testsReportSelectors.testsReport();

    // Check that tests report has been loaded
    if (testsReport) {
      const [state, path, method] = this.props.path.toJS();
      const operation = this.props.specSelectors.operationWithMeta(path, method);
      const operationId = operation.get('operationId');

      let testReport = testsReport[`${method.toUpperCase()} ${path}`];
      if (testReport === null) {
        testReport = testsReport[operationId];
      }

      if (testReport) {
        const TestsReportStatus = this.props.getComponent("TestsReportStatus", true)

        return (
          <div>
            <Original {...this.props} />
            <TestsReportStatus {...this.props} testReport={testReport} />
          </div>
        )
      }
    }
    return <Original {...this.props} />
  }
}
