Feature: ProjectTemplates

    Scenario: User navigates to ProjectTemplates
        Given I am a User loading ProjectTemplates
        When I navigate to the ProjectTemplates
        Then ProjectTemplates will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors