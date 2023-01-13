Feature: DynamicContent

    Scenario: User navigates to DynamicContent
        Given I am a User loading DynamicContent
        When I navigate to the DynamicContent
        Then DynamicContent will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors