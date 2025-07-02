Feature: Login

Background:
  Given The user is on the login page

@Login @Regression
Scenario: Verify the user is able to login with valid credentials
  Given The user logs in to the store using valid credentials
  Then The user is logged in successfully

# @ErrorValidation @Regression
# Scenario: Verify the user is not able to login with empty credentials
#   Given The user attempts to log in to the store without filling the login fields
#   Then Verify an error message is displayed for no matching credentials

# @ErrorValidation @Regression
# Scenario: Verify the user is not able to login with invalid credentials
#   Given The user logs in to the store using invalid credentials
#   Then An error message is displayed for wrong credentials

# @ErrorValidation @Regression
# Scenario: Verify the user is not able to login after multiple failed attempts
#   Given The user logs in to the store using invalid credentials
#   Then Verify an error message is displayed for failed login attempts

@Regression
Scenario: Verify the register account page is displayed when clicking on Continue
  When The user clicks on the Continue button
  Then The register account page is displayed

@Regression
Scenario: Verify all the correct links are displayed on the right side of the login page
  Then All the correct links are displayed on the right side of the login page

@Regression
Scenario: Verify the email address and password labels are displayed on the login page
  Then The email address and password labels are displayed on the login page