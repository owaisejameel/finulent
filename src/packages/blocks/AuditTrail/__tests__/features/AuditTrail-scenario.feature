Feature: AuditTrail

    Scenario: User navigates to AuditTrail
        Given I am a User loading AuditTrail
        When I navigate to the AuditTrail
        Then AuditTrail will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors