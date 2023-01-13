Feature: TaskAllocator

    Scenario: User navigates to TaskAllocator
        Given I am a User loading TaskAllocator
        When I navigate to the TaskAllocator
        Then TaskAllocator will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors