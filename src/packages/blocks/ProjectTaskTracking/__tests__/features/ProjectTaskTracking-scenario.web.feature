Feature: ProjectTaskTracking

    Scenario: User navigates to ProjectTaskTracking
        Given I am a User loading ProjectTaskTracking
        When I navigate to the ProjectTaskTracking
        Then ProjectTaskTracking will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors