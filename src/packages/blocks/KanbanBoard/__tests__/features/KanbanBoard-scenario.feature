Feature: KanbanBoard

    Scenario: User navigates to KanbanBoard
        Given I am a User loading KanbanBoard
        When I navigate to the KanbanBoard
        Then KanbanBoard will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors