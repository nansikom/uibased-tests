[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/dsogUqUG)
# Assignment 3

In this assignment you will use some of the tools we explored in class to implement integration tests for small UI-based applications.  There are two different applications you'll write tests for in this assignment.  These applications and your testing goals for each one are described below.

Before starting to write tests, make sure to set an environment in which to write those tests.  The Jest framework is already specified as a dependency in `package.json`.  Start by installing that dependency by running:
```
npm install
```
You'll need some additional tools to help test the HTML/JS-based applications in this assignment.  Make sure you also run the correct commands to install the following tools/libraries:
  * [The JSDOM Jest test environment](https://jestjs.io/docs/tutorial-jquery) to provide a DOM-based environment in which to test the apps.
  * [The DOM Testing Library](https://testing-library.com/docs/dom-testing-library/intro) for finding elements of the UI the way a user would.
  * [The User Event library](https://testing-library.com/docs/user-event/intro) for emulating user interactions with the apps.
  * [The `jest-dom` library](https://github.com/testing-library/jest-dom#readme) to provide Jest matchers for making assertions about the DOM.
  * [The Mock Service Worker library](https://mswjs.io/) for mocking responses for data requests to a web API.

## 1. Write tests for a user registration form

In the directory `registerUser/` in this repo is a small user registration form application.  In this application, the user enters an email address and password as if they were registering for a new account.  When they click the "register" button in this application, the email address and password they entered are validated.  Based on the whether the email and password are valid, one of the following things will happen:
  * If both are valid, a success message is displayed, and the values entered by the user into the form fields are cleared.
  * If either the email address or the password is invalid, an error message is displayed.  Note that if the provided password is invalid, the error message will display the specific reasons why the password is invalid.

You can experiment with this application by opening the file `registerUser/registerUser.html` in your browser.  Here are some videos depicting various behaviors of the application:
  * [Successful registration](./videos/registerUser/registerSuccess.mp4)
  * [Failed registration (no password)](./videos/registerUser/registerFail1.mp4)
  * [Failed registration (no email)](./videos/registerUser/registerFail2.mp4)
  * [Failed registration (invalid password)](./videos/registerUser/registerFail3.mp4)

Your job for this part of the assignment is to write integration tests using the tools we've covered in class.  It will be up to you to design the tests, but at a high level, your tests should include one or more test-cases for each of the behaviors depicted in the videos linked above.  Make sure to include multiple tests to cover different aspects of a single behavior when relevant (e.g. making sure the error message changes appropriately for different kinds of failures).  See below for additional requirements.

## 2. Write tests for a Roman numeral converter application

In the directory `romanNumerals/` in this repo is a small application that converts Arabic numbers to Roman numerals.  The application contains a number input field in which the user can type an Arabic number, and it supports conversion into both "old" and "modern" Roman numerals.  The application has the following behaviors:
  * The "old" Roman numeral conversion of the Arabic number entered by the user will be updated live as the user types.  This conversion is performed locally using a function in `romanNumerals.js` called `convertToOldRoman()`.
  * The "modern" Roman numeral conversion is not computed until the user submits their Arabic number by clicking the "convert to 'modern' Roman" button in the application.  This conversion is done by sending the Arabic number to a web API, which responds with the corresponding "modern" Roman numeral.  You should look at the "submit" event listener in `romanNumerals.js` to see the details of how this is done.
  * If the user modifies the number they entered after converting to "modern" Roman, then the "modern" Roman numeral is cleared.

You can experiment with this application by opening the file `romanNumerals/romanNumerals.html` in your browser.  Here are some videos depicting various behaviors of the application:
  * ["Live" conversion to "old" Roman numerals](./videos/romanNumerals/oldRomanLiveTyping.mp4)
  * [Conversion to "modern" Roman numerals](./videos/romanNumerals/modernRoman.mp4)
  * [Clearing the "modern" Roman numeral after updating the Arabic number](./videos/romanNumerals/updateAfterModernRoman.mp4)

Your job for this part of the assignment is to write integration tests using the tools we've covered in class.  It will be up to you to design the tests, but at a high level, your tests should accomplish the following (see below for additional requirements):
  * They should include one or more test-cases for each of the behaviors depicted in the videos linked above.
  * In order to avoid flakiness, they should mock the web API that's used to perform the conversion to "modern" Roman numerals.  You can find more information about this API here: https://helloacm.com/tools/romans/.  It may be helpful to experiment with the API to understand how it behaves and what kind of responses it sends, so you can mock those responses in your tests.
  * You **do not** need to implement tests for error cases for this application.

## Additional requirements for tests written for this assignment

In addition to the application-specific requirements listed above, the tests you implement for this assignment should satisfy the following general requirements:
  * They should verify that the user interface for the application responds appropriately to various user interactions with the application.  This may involve testing for the appearance or disappearance of various UI elements or other modifications to the UI.
  * They should use the tools we studied in class to interact with the application the way an end-user would.
  * Each test should focus on a single behavior (e.g. "the form fields are cleared when the email and password are both valid").  Don't try to do too much within a single test.

## Submission

We'll be using GitHub Classroom for this assignment, and you will submit your assignment via GitHub.  Make sure your completed files are committed and pushed by the assignment's deadline to the main branch of the GitHub repo that was created for you by GitHub Classroom.  A good way to check whether your files are safely submitted is to look at the main branch of your assignment repo on the github.com website (once you've accepted the assignment, you can find this via GitHub `->` profile icon `->` your organizations `->` repositories `->` click on the repo link for assignment 3 with your GitHub username).  If your changes show up there, you can consider your files submitted.

## Grading criteria

This assignment is worth 100 points total.  This is broken down as follows.

* 40 points: Submission adequately tests user registration application in `registerUser/`
  * 10 points: Tests run successfully using Jest and correctly render application HTML and JS to a testable DOM
  * 10 points: Tests successfully validate success use cases
  * 10 points: Tests successfully validate a suitable range of failure use cases
  * 10 points: Tests follow best practices:
    * Tests interact with the application the way a user would using tools covered in class
    * Each test is focused on a single behavior

* 45 points: Submission adequately tests Roman numeral conversion application in `romanNumerals/`
  * 10 points: Tests run successfully using Jest and correctly render application HTML and JS to a testable DOM
  * 15 points: Tests successfully validate a suitable range of the application's behavior
  * 10 points: Tests successfully mock the web API used to perform conversion to "modern" Roman numerals
  * 10 points: Tests follow best practices:
    * Tests interact with the application the way a user would using tools covered in class
    * Each test is focused on a single behavior

* 15 points: Awarded for answers to Q&A during demo with TA
