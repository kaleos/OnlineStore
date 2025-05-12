Feature: Login

  @Regression
  Scenario: Verify the user is able to login with valid credentials
    Given The user logs in to the store using valid credentials
    Then The user is logged in successfully

  # @ErrorValidation @Regression
  # Scenario: Verify the user is not able to login with invalid credentials
  #   Given The user logs in to the store using invalid credentials
  #   Then An error message is displayed for wrong credentials

  @ErrorValidation @Regression
  Scenario: Verify the user is not able to login after multiple failed attempts
    Given The user logs in to the store using invalid credentials
    Then Verify an error message is displayed for failed login attempts

  # @ErrorValidation @Regression
  # Scenario: Verify the user is not able to login with empty credentials
  #   Given The user attempts to log in to the store without filling the login fields
  #   Then Verify an error message is displayed for no matching credentials