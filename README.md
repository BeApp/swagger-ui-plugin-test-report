# Introduction

This [Swagger-UI](https://github.com/swagger-api/swagger-ui) plugin allows to display tests report on each operation. It may be unit test report validating API implentation against the specification.

It works by wrapping `InfoContainer` and `JumpToPath` components to inject custom components.

# Installation

```
npm i swagger-ui-plugin-test-report
```

# Usage

Add the plugin in the configuration object of SwaggerUI like below. You will also have to fetch and provide a tests report object.

```js
import { TestsReportPlugin } from 'swagger-ui-plugin-test-report';

SwaggerUI({
  // ...
  plugins: [
    TestsReportPlugin
  ],
  onComplete: async () => {
    const testsReport = await testReportFetcher.getTestsReport();
    ui.setTestsReport(testsReport)
  }
})
```

Let's assume this spec file :

```yaml
openapi: "3.0.1"
# ...
paths:
  /my-endpoint:
    get:
      operationId: getMyAwesomeEndpoint
      responses:
        "200":
          description: "Successful operation"
```

The object passed to `setTestsReport` should look like this :

```js
const testsReport = {
  "getMyAwesomeEndpoint": {
    status: "fail",
    result: {
      errors: 0,
      failures: 1,
      skipped: 0,
      tests: 2
    },
    testCases: [
      {
        status: "pass",
        name: "Nominal scenario",
        message: null,
      },
      {
        status: "failure",
        name: "Unknown resource",
        message: "Lorem ipsum dolor sit amet",
      }
    ],
    timestamp: new Date("2021-04-30T20:00:32+0200")
  }
}
```

_Note :_ Once the plugin has been applied, two components will be accessible if needed : `TestsReportPopup` and `TestsReportStatus`.
