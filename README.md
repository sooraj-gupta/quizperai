# Quizper AI Chrome Extension

Quizper AI is a Chrome extension designed to assist you with answering homework quiz questions on Canvas. This extension uses OpenAI's GPT-4 API to provide correct answers and explanations for homework quiz questions.

## Features
- Automatically identify and highlight the correct answer for homework quiz questions.
- Provide brief explanations for why an answer is correct.

## Installation

### Prerequisites
- Google Chrome browser
- OpenAI API Key

### Steps
1. **Clone the repository or download the ZIP file.**
2. **Unzip the file if you downloaded the ZIP.**
3. **Generate an OpenAI API Key:**
   - Visit [OpenAI's API platform](https://platform.openai.com/).
   - Sign up or log in to your account.
   - Generate an API key and copy it.
4. **Configure the Extension:**
   - Open `content.js` in your preferred text editor.
   - Replace the placeholder `'<YOUR_OPEN_AI_API_KEY>'` with your actual OpenAI API key.
   
   ```OPEN_AI_API_KEY = '<YOUR_OPEN_AI_API_KEY>'```

    - Save the file.
5. **Open Chrome and navigate to `chrome://extensions/`.**
6. **Enable Developer Mode by clicking the toggle switch in the top right corner.**
7. **Click the "Load unpacked" button and select the directory where you unzipped the file.**

### Usage
1. **Navigate to a page with homework quiz questions.**
2. **Click on the "Ask Quizper AI" button that appears next to each question.**
3. **Quizper AI will identify the correct answer and highlight it.**
4. **Click the "Why?" button next to the highlighted answer to get a brief explanation.**
   
### Contributing
1. **Fork the repository.**
2. **Create a new branch (git checkout -b feature-branch).**
3. **Make your changes and commit them (git commit -m 'Add some feature').**
4. **Push to the branch (git push origin feature-branch).**
5. **Open a pull request.**

***
> This extension is powered by AI and the answers provided may not always be correct. Please use it as a supplementary tool and do not fully depend on it for accurate answers.
