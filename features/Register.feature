Feature: Register

Background:
Given The user is on the register page

@Register
Scenario: Verify error messages are displayed for required fields during registration
  When Clicking on the Continue button
  Then Error messages are displayed for all required fields

@Register
Scenario: Verify successful registration with valid data
  And The user enters valid data in all required fields
  When Clicking on the Continue button
  Then A success message should be displayed

@Register
Scenario: Verify an error is displayed for mistmatched passwords
  And The user enters invalid data in all required fields
  When Clicking on the Continue button
  Then An error message is displayed for mismatched passwords

@Register
Scenario Outline: Verify all the correct labels are displayed on the left of the input fields
  Then The following "<labels>" should be displayed

Examples:
  | labels           |
  | First Name       |
  | Last Name        |
  | E-Mail           |
  | Telephone        |
  | Password         |
  | Password Confirm |
  | Newsletter       |
  | Subscribe        |

@Register
Scenario Outline: Verify all the correct links are displayed on the right of the page
  Then The correct "<links>" should be displayed

Examples:
  | links              |
  | Login              |
  | Register           |
  | Forgotten Password |
  | My Account         |
  | Address Book       |
  | Wish List          |
  | Order History      |
  | Downloads          |
  | Recurring payments |
  | Reward Points      |
  | Returns            |
  | Transactions       |
  | Newsletter         |

@Register
Scenario: Verify the Subscribe radio buttons are functional
  When The user clicks on the Yes radio button
  Then The radio button is checked for Yes Subscribe
  When The user clicks on the No radio button
  Then The radio button is checked for No Subscribe

@Register
Scenario: Verify the text "I have read and agree to the Privacy Policy" is displayed
  Then The text I have read and agree to the Privacy Policy is displayed