Feature: CfTaskTrackManagementBoard

    Scenario: User navigates to CfTaskTrackManagementBoard
        Given I am a User loading CfTaskTrackManagementBoard
        When I navigate to the CfTaskTrackManagementBoard
        Then CfTaskTrackManagementBoard will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors