Feature: IntegrationWithExistingHrmsPlatform

    Scenario: User navigates to IntegrationWithExistingHrmsPlatform
        Given I am a User loading IntegrationWithExistingHrmsPlatform
        When I navigate to the IntegrationWithExistingHrmsPlatform
        Then IntegrationWithExistingHrmsPlatform will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors