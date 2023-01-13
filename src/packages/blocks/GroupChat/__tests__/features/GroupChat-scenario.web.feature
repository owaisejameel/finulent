Feature: GroupChat

    Scenario: User navigates to GroupChat
        Given I am a User loading GroupChat
        When I navigate to the GroupChat
        Then GroupChat will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors