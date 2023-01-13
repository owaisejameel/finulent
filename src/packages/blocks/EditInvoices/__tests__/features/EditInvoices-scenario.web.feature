Feature: EditInvoices

    Scenario: User navigates to EditInvoices
        Given I am a User loading EditInvoices
        When I navigate to the EditInvoices
        Then EditInvoices will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors