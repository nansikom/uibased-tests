/**
 * @jest-environment jsdom
 */
// wat were tryna load the testing enviroment
const fs = require("fs")
// imprt dom testing library to import roles
//const path = require('path')


const domTesting = require('@testing-library/dom')
//augument expect matches and assertions using existing globals
require('@testing-library/jest-dom')
// simulate events the way the user would do it
const userEvent  = require("@testing-library/user-event").default



beforeEach(() => {
    jest.resetModules();
});
function initDomFromFiles(htmlPath, jsPath){
    const html = fs.readFileSync(htmlPath, 'utf8');

    //trying to load our html stromg using the document key word
    //setting up our browser side globals
    // load an html into a document object model
    // load a javascript to execute against the document object model
    // test the webpages funtionality.
    document.open()
    document.write(html)
    document.close()
    // fresh import of the javascript file into the library each time
    require(jsPath)
    
}


test("An email can be input when its valide  ", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/registerUser.html`,`${__dirname}/registerUser.js`)
    //get input according to the label text
    const emailinput = domTesting.getByLabelText(document,"Email")
    // acquire the button
    const addButton = domTesting.getByRole(document, "button")
    //act
    const user = userEvent.setup()
    //simulate typing the email and the passwor
    await user.type(emailinput, "nansikom@oregonstate.edu")
    //await user.type(passwordinput ,"Meme12@")
    await user.click(addButton)
    //assert
    expect(emailinput).toHaveValue("nansikom@oregonstate.edu")
    //get content in the list 
});
test("A password can be input when its valid  ", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/registerUser.html`,`${__dirname}/registerUser.js`)
    //const emailinput = domTesting.getByLabelText(document,"Email")
    const passwordinput= domTesting.getByLabelText(document,"Password")
    // acquire the button
    const addButton = domTesting.getByRole(document, "button")
    //act
    const user = userEvent.setup()
    //simulate typing the email and the password
    await user.type(passwordinput ,"Meme172@")
    await user.click(addButton)
    //assert
    expect(passwordinput).toHaveValue("Meme172@")
    //get content in the list 
});
test("An email can be cleared  when both email and password are valid after submission  ", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/registerUser.html`,`${__dirname}/registerUser.js`)
 //  const register = domTesting.getByText(document, "0")
    //get input according to the label text
    const emailinput = domTesting.getByLabelText(document,"Email")
    const passwordinput= domTesting.getByLabelText(document,"Password")
    // acquire the button
    const addButton = domTesting.getByRole(document, "button")
    //act
    const user = userEvent.setup()
    //simulate typing the email and the passwor
    await user.type(emailinput, "nansikom@oregonstate.edu")
    await user.type(passwordinput ,"Meme212@")
    await user.click(addButton)
    //assert
    expect(emailinput).not.toHaveValue()
    //get content in the list 
});
test("A password can be cleared  when both email and password are valid after submission  ", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/registerUser.html`,`${__dirname}/registerUser.js`)
    //get input according to the label text
    const emailinput = domTesting.getByLabelText(document,"Email")
    const passwordinput= domTesting.getByLabelText(document,"Password")
    // acquire the button
    const addButton = domTesting.getByRole(document, "button")
    //act
    const user = userEvent.setup()
    //simulate typing the email and the passwor
    await user.type(emailinput, "nansikom@oregonstate.edu")
    await user.type(passwordinput ,"Meme212@")
    await user.click(addButton)
    //assert
    expect(passwordinput).not.toHaveValue()
    //get content in the list 
});
test("A success message is displayed when both email and password are valid after submission  ", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/registerUser.html`,`${__dirname}/registerUser.js`)
    //get input according to the label text 
    const emailinput = domTesting.getByLabelText(document,"Email")
    const passwordinput= domTesting.getByLabelText(document,"Password")
    // acquire the button
    const addButton = domTesting.getByRole(document, "button")
    //act
    const user = userEvent.setup()
    //simulate typing the email and the passwor
    await user.type(emailinput, "nansikom@oregonstate.edu")
    await user.type(passwordinput ,"Meme212@")
    await user.click(addButton)
    //assert
    const { getByRole} = require('@testing-library/dom')
   const successMessage = getByRole(document, 'status')
   expect(successMessage).toBeInTheDocument()
   expect(successMessage).toHaveTextContent('✅ Success')
   expect(successMessage).toHaveTextContent('You have successfully registered.')
});
test("Password field being empty ", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/registerUser.html`,`${__dirname}/registerUser.js`)
    //get input according to the label text
    const emailinput = domTesting.getByLabelText(document,"Email")
    const passwordinput= domTesting.getByLabelText(document,"Password")
    // acquire the button
    const addButton = domTesting.getByRole(document, "button")
    //act
    const user = userEvent.setup()
    //simulate typing the email and the passwor
    //await user.type(emailinput, "nansikom@oregonstate.edu")
    passwordinput.value='';
    //await user.type(passwordinput ,'')
    await user.click(addButton)
    //assert
   expect(passwordinput).toHaveValue('')
});
test("Expect an error message to be present for when password is empty ", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/registerUser.html`,`${__dirname}/registerUser.js`)
    //get input according to the label text
    const emailinput = domTesting.getByLabelText(document,"Email")
    const passwordinput= domTesting.getByLabelText(document,"Password")
    // acquire the button
    const addButton = domTesting.getByRole(document, "button")
    //act
    const user = userEvent.setup()
    //simulate typing the email and the passwor
    await user.type(emailinput, "nansikom@oregonstate.edu")
    //await user.type(passwordinput ,'')
    passwordinput.value='';
    await user.click(addButton)
    //assert
   // expect(domTesting.queryByText(document, "Success!")).toBeInTheDocument();
   const { getByRole} = require('@testing-library/dom')
   const errorMessage = getByRole(document.body, 'alert')
   expect(errorMessage.textContent).not.toBe('') //This will show an error message is present
   expect(errorMessage).toBeInTheDocument()
});
test("Password field contains more errors when password is invalid ", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/registerUser.html`,`${__dirname}/registerUser.js`)
 //  const register = domTesting.getByText(document, "0")
    //get input according to the label text
    const emailinput = domTesting.getByLabelText(document,"Email")
    const passwordinput= domTesting.getByLabelText(document,"Password")
    // acquire the button
    const addButton = domTesting.getByRole(document, "button")
    //act
    const user = userEvent.setup()
    //simulate typing the email and the passwor
    await user.type(emailinput, "nansikom@oregonstate.edu")
    //await user.type(passwordinput ,'')
    passwordinput.value='';
    await user.click(addButton)
    //assert
   const { getByRole} = require('@testing-library/dom')
   const errorMessage = getByRole(document.body, 'alert')
   expect(errorMessage.textContent).toContain('The password you entered is invalid') //This will show an error message is present
   expect(errorMessage.textContent).toContain('Password needs to be at least 8 characters') 
   expect(errorMessage.textContent).toContain('Password needs a lower case letter') 
   expect(errorMessage.textContent).toContain('Password needs an upper case letter') 
   expect(errorMessage.textContent).toContain('Password needs a numeric digit (0-9)') 
   expect(errorMessage.textContent).toContain('Password needs a symbol (!@#$%^&*') 
   expect(errorMessage.textContent).toContain('Password contains an invalid character (only letters, numbers, and the symbols !@#$%^&* are allowed')
   expect(errorMessage).toBeInTheDocument()
});
test("If email is absent expect an error ", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/registerUser.html`,`${__dirname}/registerUser.js`)
 //  const register = domTesting.getByText(document, "0")
    //get input according to the label text
    const emailinput = domTesting.getByLabelText(document,"Email")
    const passwordinput= domTesting.getByLabelText(document,"Password")
    // acquire the button
    const addButton = domTesting.getByRole(document, "button")
    //act
    const user = userEvent.setup()
    //simulate typing the email and the passwor
    //await user.type(emailinput, '')
    await user.type(passwordinput ,"Meme212@")
    emailinput.value='';
    //await user.type(passwordinput ,'')
    passwordinput.value='';
    await user.click(addButton)
    //assert
   const { getByRole} = require('@testing-library/dom')
   const errorMessage = getByRole(document.body, 'alert')
   expect(errorMessage.textContent).not.toBe('') //This will show an error message is present
   expect(errorMessage).toBeInTheDocument()
});
test("EXpect a specific error message when email is absent but password is present", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/registerUser.html`,`${__dirname}/registerUser.js`)
    //get input according to the label text
    const emailinput = domTesting.getByLabelText(document,"Email")
    const passwordinput= domTesting.getByLabelText(document,"Password")
    // acquire the button
    const addButton = domTesting.getByRole(document, "button")
    //act
    const user = userEvent.setup()
    //simulate typing the email and the passwor
    //await user.type(emailinput, '')
    await user.type(passwordinput ,"Meme212@")
    emailinput.value='';
    //await user.type(passwordinput ,'')
    passwordinput.value='';
    await user.click(addButton)
    //assert
   // expect(domTesting.queryByText(document, "Success!")).toBeInTheDocument();
   const { getByRole} = require('@testing-library/dom')
   const errorMessage = getByRole(document.body, 'alert')
   expect(errorMessage.textContent).toContain('The email address you entered is invalid') //This will show an error message is present
   expect(errorMessage).toBeInTheDocument()
});
test("An email can be input when its valid  ", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/registerUser.html`,`${__dirname}/registerUser.js`)
    //get input according to the label text
    const emailinput = domTesting.getByLabelText(document,"Email")
    // acquire the button
    const addButton = domTesting.getByRole(document, "button")
    //act
    const user = userEvent.setup()
    //simulate typing the email and the passwor
    await user.type(emailinput, "nansikom@oregonstate.edu")
    //await user.type(passwordinput ,"Meme12@")
    await user.click(addButton)
    //assert
   // expect(domTesting.queryByText(document, "Success!")).toBeInTheDocument();
    expect(emailinput).toHaveValue("nansikom@oregonstate.edu")
    //expect (passwordinput).toHaveValue("Meme12@")
    //get content in the list 
});
test("Email is present but password lacks some requirements when register button is clicked ", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/registerUser.html`,`${__dirname}/registerUser.js`)
    //get input according to the label text
    const emailinput = domTesting.getByLabelText(document,"Email")
    const passwordinput= domTesting.getByLabelText(document,"Password")
    // acquire the button
    const addButton = domTesting.getByRole(document, "button")
    //act
    const user = userEvent.setup()
    //simulate typing the email and the passwor
    await user.type(emailinput, "nansikom@oregonstate.edu")
    ///passwordinput.value='';
    //await user.type(passwordinput ,'')
    passwordinput.value='';
    await user.click(addButton)
    //assert
   expect(emailinput).toHaveValue("nansikom@oregonstate.edu")

   const { getByRole} = require('@testing-library/dom')
   const errorMessage = getByRole(document.body, 'alert')
   expect(errorMessage.textContent).toContain('The password you entered is invalid') //This will show an error message is present
   expect(errorMessage.textContent).toContain('Password needs to be at least 8 characters') 
   expect(errorMessage.textContent).toContain('Password needs an upper case letter') 
   expect(errorMessage.textContent).toContain('Password needs a symbol (!@#$%^&*') 
   expect(errorMessage).toBeInTheDocument()
});