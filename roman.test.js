/**
 * @jest-environment jsdom
 */
// wat were tryna load the testing enviroment
const fs = require("fs")
// imprt dom testing library to import roles
//const path = require('path')
//const { convertToOldRoman } = require('./romanNumerals.js')
require("whatwg-fetch")

const domTesting = require('@testing-library/dom')
//augument expect matches and assertions using existing globals
require('@testing-library/jest-dom')
// simulate events the way the user would do it
const userEvent  = require("@testing-library/user-event").default
const { waitFor }=require('@testing-library/dom');

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

test("A number can be input in the arabic conversion field input ", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/romanNumerals.html`,`${__dirname}/romanNumerals.js`)
    //get input according to the label text
    const arabicinput = domTesting.getByLabelText(document,"Arabic number (1-3999)")
    //act
    const user = userEvent.setup()
    //simulate typing the email and the passwor
    await user.type(arabicinput, "1")
    //assert
   // expect(domTesting.queryByText(document, "Success!")).toBeInTheDocument();
    expect(arabicinput.value.toString()).toBe("1")
});
test("A Testing another number to make sure its within our range ", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/romanNumerals.html`,`${__dirname}/romanNumerals.js`)
    //get input according to the label text
    const arabicinput = domTesting.getByLabelText(document,"Arabic number (1-3999)")
    
    //act
    const user = userEvent.setup()
    //simulate typing the email and the passwor
    await user.type(arabicinput, "1345")
    //assert
    expect(arabicinput.value.toString()).toBe("1345")
});
test("Testing the conversion of a number into the old roman numeral system ", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/romanNumerals.html`,`${__dirname}/romanNumerals.js`)
    //get input according to the label text
    const arabicinput = domTesting.getByLabelText(document,"Arabic number (1-3999)")
    //const result = domTesting.getById(document,"old-roman-result")
    const result = document.getElementById("old-roman-result")
    const user = userEvent.setup()
    await user.type(arabicinput, "4")
    expect(result.textContent).toBe("IIII")
});

test("Trigger Api conversion of a number to be in the modern roman numeral system only after the button is clicked", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/romanNumerals.html`,`${__dirname}/romanNumerals.js`)
    //act
    //get input according to the label text
    const queryInput = domTesting.getByLabelText(
        document,
        "Arabic number (1-3999)"
    )
    const convertButton = domTesting.getByRole(document,"button")
    const user = userEvent.setup()
    await user.type(queryInput, "1234")
    await user.click(convertButton)
    //make an Api request
    const response = await fetch(`https://romans.justyy.workers.dev/api/romans/?n=${1234}`)
    //response to the api request until the data brings back our response
    const data = await response.json ()
   // assert
    expect(data).not.toBeNull()
    expect(data.result).toBe("MCCXXXIV")

})


test("Modern numeral output is cleared after the user modifies input ", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/romanNumerals.html`,`${__dirname}/romanNumerals.js`)
    //get input according to the label text
    //act
    const arabicinput = domTesting.getByLabelText(document,"Arabic number (1-3999)")
    const user = userEvent.setup()
    const result = document.getElementById("modern-roman-result")
    const convertButton = domTesting.getByRole(document, "button")
    //simulate typing the email and the passwor
    await user.type(arabicinput, "4")
   // const addButton = domTesting.getByRole(document, "button")
    await user.click(convertButton)

    await  waitFor(()=>{
    expect(result.textContent).toBe("IV")
    });
  await user.type(arabicinput, "4");
  //assert
  expect(result.textContent).toBe("");
});
test("Old numeral output testing out when user types numbers in live mode to see the expected output changing as user types ", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/romanNumerals.html`,`${__dirname}/romanNumerals.js`)
    //get input according to the label text
    const arabicinput = domTesting.getByLabelText(document,"Arabic number (1-3999)")
    const user = userEvent.setup()
    const result = document.getElementById("old-roman-result")
    const convertButton = domTesting.getByRole(document, "button")
    //simulate typing the email and the passwor
    await user.type(arabicinput, "4")
    await  waitFor(()=>{
    expect(result.textContent).toBe("IIII")
    });
  //  expect(actualoutput).toBe(expectedoutput);
  await user.type(arabicinput, "4");
  expect(result.textContent).toBe("XXXXIIII");
});
test("Old numeral output is also cleared after change in output ", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/romanNumerals.html`,`${__dirname}/romanNumerals.js`)
    //get input according to the label text
    const arabicinput = domTesting.getByLabelText(document,"Arabic number (1-3999)")
    const user = userEvent.setup()
    const result = document.getElementById("old-roman-result")
    const convertButton = domTesting.getByRole(document, "button")
    //simulate typing the email and the passwor
    //act
    await user.type(arabicinput, "4")
    await  waitFor(()=>{
    expect(result.textContent).toBe("IIII")
    });
  //  expect(actualoutput).toBe(expectedoutput);
  //assert
  await user.type(arabicinput, "4");
  expect(result.textContent).toBe("XXXXIIII");
});
test("Arabic input should clear if user is pressing backspace key until they step pressing it to the end", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/romanNumerals.html`,`${__dirname}/romanNumerals.js`)
    //act
    //get input according to the label text
    const arabicinput = domTesting.getByLabelText(document,"Arabic number (1-3999)")
    const user = userEvent.setup()
    const result = document.getElementById("modern-roman-result")
    const convertButton = domTesting.getByRole(document, "button")
    //simulate typing the email and the passwor
    for(let i=0; i<arabicinput.value.length; i++){
        await user.type(arabicinput, `{backspace}`)
    }
  expect(arabicinput.value).toBe("");

});
test("Arabic input should clear if user is pressing backspace key until they step pressing it to the end", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/romanNumerals.html`,`${__dirname}/romanNumerals.js`)
    //get input according to the label text
    const arabicinput = domTesting.getByLabelText(document,"Arabic number (1-3999)")
    const user = userEvent.setup()
    const result = document.getElementById("modern-roman-result")
    const convertButton = domTesting.getByRole(document, "button")
    //simulate typing the email and the password
    //act
    await user.type(arabicinput, "1234")
    for(let i=0; i < 4; i++){
        await user.type(arabicinput, `{backspace}`)
    }
  
    //assert
  await waitFor(() => expect(result.textContent).toBe(""));


});
test("Arabic input should change in live mode when backspace key is activated such that the values change vigorously", async function() {
    //arrange
    initDomFromFiles(`${__dirname}/romanNumerals.html`,`${__dirname}/romanNumerals.js`)
    //get input according to the label text
    const arabicinput = domTesting.getByLabelText(document,"Arabic number (1-3999)")
    const user = userEvent.setup()
    const result = document.getElementById("old-roman-result")
    const convertButton = domTesting.getByRole(document, "button")
    //simulate typing the email and the password
    await user.type(arabicinput, "1233")
    await waitFor(() => expect(result.textContent).toBe("MCCXXXIII"));
        await user.type(arabicinput, `{backspace}`)
    
  await waitFor(() => expect(result.textContent).toBe("CXXIII"));

});

