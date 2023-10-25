let loaderContainer = document.getElementById("loader-container");




const codeEditor = CodeMirror.fromTextArea(document.getElementById('code'), {
    theme: 'default',
    lineNumbers: true,
});

const sourceLanguageSelect = document.getElementById('sourceLanguageSelect');
sourceLanguageSelect.addEventListener('change', () => {
    const selectedLanguage = sourceLanguageSelect.value;
    codeEditor.setOption('mode', selectedLanguage);
});

const generateTextButton = document.getElementById('convertButton');
generateTextButton.addEventListener('click', () => {
    const sourceCode = codeEditor.getValue();
    const targetLanguage = document.getElementById('targetLanguageSelect').value;
    
    // Add code conversion logic here, using the selected source and target languages
    // For demonstration purposes, we'll just display the code as-is
    // document.getElementById('output-content').textContent = sourceCode;
    const myFunction = codeEditor.getValue();
      
      const singleLineFunction = myFunction.toString().replace(/\n/g, ' ');
      const singleLineFunctionWithoutQuotes = singleLineFunction.replace(/"/g, '');
    const userMessage = `convert this code ${singleLineFunctionWithoutQuotes} into ${targetLanguage}  write only code nothing else`;
    generateText(userMessage)
});



const summarizeTextButton = document.getElementById('summarizeTextButton');
summarizeTextButton.addEventListener('click', () => {
    const sourceCode = codeEditor.getValue();
    
    const myFunction = codeEditor.getValue();
      
      const singleLineFunction = myFunction.toString().replace(/\n/g, ' ');
      const singleLineFunctionWithoutQuotes = singleLineFunction.replace(/"/g, '');
    const userMessage = `summarize this code ${singleLineFunctionWithoutQuotes} and check the missing part of code or you can say error in code and provide the explaination of code and heighlight the important points and provide correct code at last`;
    generateText(userMessage)
});




const reviewcode = document.getElementById('reviewcode');
reviewcode.addEventListener('click', () => {
    const sourceCode = codeEditor.getValue();
    
    const myFunction = codeEditor.getValue();
      
      const singleLineFunction = myFunction.toString().replace(/\n/g, ' ');
      const singleLineFunctionWithoutQuotes = singleLineFunction.replace(/"/g, '');
    const userMessage = `review this code ${singleLineFunctionWithoutQuotes} and provide your feedback and provide marks out of 100% on 1. coding skills 2. communication skills 3. error handdling 4. code performance 5. code documantation 6. code modularity 7. code complexity 8. code duplication 9. code readibility and also provide key point of each`;
    generateText(userMessage)
});



function showLoader() {
    loaderContainer.style.display = 'flex';
}

function hideLoader() {
    loaderContainer.style.display = 'none';
}



async function generateText(userMessage) {
    showLoader(loader);
    console.log(userMessage)
    const endpoint = 'http://localhost:9090/generate-text'; // Replace with your actual endpoint
    const requestData = {"topic": userMessage };
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (response.ok) {
            const generatedContent = await response.text();
            updateGeneratedContent(generatedContent);
        } else {
            updateGeneratedContent('Error occurred while generating content.');
        }
    } catch (error) {
        console.error(error);
        updateGeneratedContent('Error occurred while generating content.');
    } finally {
        hideLoader(loader); // Hide the loader when data fetching is complete
    }
}

function updateGeneratedContent(content) {
    const generatedContentDisplay = document.getElementById('output-content');
    generatedContentDisplay.textContent = content;
}