import { createSelector } from "reselect"
import { InfoContainerWrapper } from './info-container-wrapper'
import { JumpToPathWrapper } from './jump-to-path-wrapper'
import { TestsReportPopup } from './tests-report-popup'
import { TestsReportStatus } from './tests-report-status'
import './tests-report-plugin.css'

export const ACTION_SET_TESTS_REPORT = "testsReports_action_setTestsReport"
export const ACTION_SHOW_DETAILS = "testsReports_action_showDetails"
export const STATE_TESTS_REPORT = "testReport_state_testsReport"
export const STATE_TEST_REPORT = "testReport_state_testReport"

export const TestsReportPlugin = (system) => {
  return {
    afterLoad(system) {
      this.rootInjects = this.rootInjects || {}
      this.rootInjects.setTestsReport = system.testsReportActions.setTestsReport
    },
    components: {
      TestsReportPopup: TestsReportPopup,
      TestsReportStatus: TestsReportStatus
    },
    wrapComponents: {
      InfoContainer: InfoContainerWrapper,
      JumpToPath: JumpToPathWrapper,
    },
    statePlugins: {
      testsReport: {
        actions: {
          setTestsReport: (testsReport) => ({
            type: ACTION_SET_TESTS_REPORT,
            payload: testsReport
          }),
          showDetailPopup: (testReport) => ({
            type: ACTION_SHOW_DETAILS,
            payload: testReport
          }),
        },
        reducers: {
          [ACTION_SET_TESTS_REPORT]: (state, action) => {
            return state.set(STATE_TESTS_REPORT, action.payload)
          },
          [ACTION_SHOW_DETAILS]: (state, action) => {
            return state.set(STATE_TEST_REPORT, action.payload)
          },
        },
        selectors: {
          testsReport: createSelector(
            state => state,
            testsReport => testsReport.get(STATE_TESTS_REPORT) || null
          ),
          testsReportDetail: createSelector(
            state => state,
            testsReport => testsReport.get(STATE_TEST_REPORT) || null
          ),
        }
      }
    },
  }
}
