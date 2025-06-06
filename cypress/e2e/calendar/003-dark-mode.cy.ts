import { cypressPageUrls } from '../../pages/urls.ts'
import { createCalendarHeaderPageObject } from '../../../libs/e2e-testing/src/page-objects/calendar-header.page-object.ts'
import { SNAPSHOT_FAULT_TOLERANCE } from '../../../libs/e2e-testing/src/index.ts'

describe('Calendar dark mode', {
  viewportHeight: 800,
  viewportWidth: 1280
}, () => {
  const calendarHeader = createCalendarHeaderPageObject()

  beforeEach(() => {
    cy.visit(cypressPageUrls.calendar.darkMode)
  })

  it('should render events in the week view', () => {
    cy.wait(1000) // for scrolling to finish
    cy.compareSnapshot(
      'calendar-dark-mode__week-view',
      SNAPSHOT_FAULT_TOLERANCE
    )
  })

  it('should render events in the month view', () => {
    calendarHeader.openViewByLabel('Month')
    cy.wait(100) // wait for animation and event rendering
    cy.compareSnapshot(
      'calendar-dark-mode__month-view',
      SNAPSHOT_FAULT_TOLERANCE
    )
  })

  it('should render events in the day view', () => {
    cy.wait(1000) // for scrolling to finish
    calendarHeader.openViewByLabel('Day')
    cy.wait(100) // for event rendering to finish
    cy.compareSnapshot('calendar-dark-mode__day-view', SNAPSHOT_FAULT_TOLERANCE)
  })
})
