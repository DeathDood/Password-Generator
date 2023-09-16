document.addEventListener('DOMContentLoaded', function () {
    // Gets the Elements from the HTML file
    const passwordRange = document.getElementById('passwordRange');
    const passwordNumber = document.getElementById('passwordNumber');
    const form = document.getElementById('passwordForm');
    const includeUppercase = document.getElementById('uppercaseLetters');
    const includeNumbers = document.getElementById('numbers');
    const includeSymbols = document.getElementById('symbols');
    const passwordDisplay = document.getElementById('passwordD');
    const copyPassword = document.getElementById('buttonCopyPassword');

    // Changes them depending on what's getting changed "syncs them"
    passwordNumber.addEventListener('input', syncPassword);
    passwordRange.addEventListener('input', syncPassword);
 
    const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
    const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
    const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
    const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(arrayFromLowToHigh(58, 64)).concat(arrayFromLowToHigh(91, 96)).concat(arrayFromLowToHigh(123, 126));
 
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const characterAmount = passwordNumber.value;
        const includeNumbersChecked = includeNumbers.checked;
        const includeSymbolsChecked = includeSymbols.checked;
        const includeUppercaseChecked = includeUppercase.checked;
        const password = generatePassword(characterAmount, includeUppercaseChecked, includeNumbersChecked, includeSymbolsChecked);
        passwordDisplay.innerText = password;
    });
 
    // Uses the character code for the password
    function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
        let charCodes = LOWERCASE_CHAR_CODES;
        if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
        if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
        if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
        const passwordCharacters = [];
        for (let i = 0; i < characterAmount; i++) {
            const character = charCodes[Math.floor(Math.random() * charCodes.length)];
            passwordCharacters.push(String.fromCharCode(character));
        }
        return passwordCharacters.join('');  // Returns the array as a string
    }
 
    // Copies the password to the clipboard
    copyPassword.addEventListener('click', function () {
        // Get the generated password from the display
        const generatedPassword = passwordDisplay.innerText;

        if (generatedPassword) {
            // Create a temporary text area element to store the password
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = generatedPassword;

            // Append the text area to the document
            document.body.appendChild(tempTextArea);

            tempTextArea.select();
            try {
                // Execute the copy command using the Clipboard API
                document.execCommand('copy');
                console.log('Password copied to clipboard');
            } catch (err) {
                console.error('Unable to copy password:', err);
            } finally {
                document.body.removeChild(tempTextArea);
            }
        }
    });

    // Generated the arrays
    function arrayFromLowToHigh(low, high) {
        const array = [];
        for (let i = low; i <= high; i++) {
            array.push(i);
        }
        return array;
    }
 
    // Syncs the range/slider with the number input
    function syncPassword(e) {
        console.log('Event triggered');
        const value = e.target.value;
        passwordNumber.value = value;
        passwordRange.value = value;
    }
 });
