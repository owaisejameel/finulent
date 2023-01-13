Feature: Timestamp

    Scenario: User navigates to Timestamp
        Given I am a User loading Timestamp
        When I navigate to the Timestamp
        Then Timestamp will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors