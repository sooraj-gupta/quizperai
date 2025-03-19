// content.js
// Chrome extension code that will run on the page
// This code will be injected into the page
// Generate an Open AI API key at https://platform.openai.com/ then replace the placeholder with the key

OPEN_AI_API_KEY = '<YOUR_OPEN_AI_API_KEY>'
MODEL = 'gpt-4o'



document.querySelectorAll('.question_holder').forEach((element, idx) => 
{

  let header = element.getElementsByClassName('header')[0]

  let start = document.createElement('button');
  start.innerText = "Ask Quizper AI";
  start.className = "canvasext-help-button";

  header.appendChild(start);

  start.onclick =  (e) => 
  {
    e.preventDefault();

      let messages = [
        {
          "role": "system",
          "content": `You are a test helper, you will take a question with answer choices and return the correct answer. an example is:
    USER: 
    Flag question: Question 2
    Question 2
    1 pts
    What general principle of evidential support does White make use of in his Fine-Tuning Argument (FTA)?
    Supporting materials: White, Fine-Tuning Argument (FTA)

    Group of answer choices
    inference to an induction
    inference to a generalization
    inference to the next instance
    inference to the best explanation

    Supporting materials: White, Fine-Tuning Argument (FTA)

    ASSISTANT:
    inference to the best explanation
            `
        },
        {
          "role": "user",
          "content": element.innerText
        }
      ]
      console.log(element.innerText)
      fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPEN_AI_API_KEY}`
          },
          body: JSON.stringify({
            "model": MODEL,
            "messages": messages
          })
        })
        .then(response => response.json())
        .then(data => 
        {

          let cor_answer = data.choices[0].message.content
          // let cor_answer = data.content[0].text;
          let answers = element.querySelectorAll('.answer_label')
          let foundAnswer = false;
          for(let i = 0; i < answers.length; i++){
            // answers[i].style.opacity = 0.7
            if(answers[i].innerText == cor_answer){
              foundAnswer = true;
              answers[i].classList.add('canvasext-correct-answer')
              let whyButton = document.createElement('button');
              whyButton.innerText = "Why?";
              whyButton.className = "canvasext-why-button";
              whyButton.onclick = (ev) => {
                ev.preventDefault();
                whyButton.innerText = "Loading...";
                fetch('https://api.openai.com/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPEN_AI_API_KEY}`

                  },
                  body: JSON.stringify({
                    "model": MODEL,
                    "messages": [
                      {
                        "role": "system",
                        "content": `I will provide you with the correct answer and the question along with the incorrect answer choices. make your answer short no longer than 1-2 sentences. an example is:
                        USER: 
                        Why is the answer to the question "Suppose you hate reality shows, but you pretend to like them in order to fit in, feel good, and be accepted by your friends, who all love reality television. This is an example of ________ social influence." 
                        "normative" and not "groupthink", "informational", or "confirmatory"?`
                      },
                      {
                        "role": "user",
                        "content": `Why is the answer to the question "${element.innerText}" "${answers[i].innerText}"?`
                      }
                    ]
                  })
                }) 
                .then(response => response.json())
                .then(data => 
                { 
                  whyButton.innerText = "Why?";
                  let why = document.createElement('p');
                  let close = document.createElement('button');
                  close.innerText = "×";
                  close.className = "canvasext-close";
                  close.onclick = (event) => {
                    event.preventDefault();
                    why.remove();
                  } 
                  why.innerText = data.choices[0].message.content;
                  why.style.zIndex = "1000";
                  why.className = "canvasext-why";
                  why.appendChild(close);
                  document.body.appendChild(why);
                  console.log( data.choices[0].message.content ); 
                })
              }
              answers[i].style.position = "relative";
              answers[i].style.paddingRight = "50px";
              answers[i].appendChild(whyButton);

            }
          }
          if(!foundAnswer){
            element.innerHTML += `<p class = 'thing' style = "font-size: 5px; opacity: 0.2">${cor_answer}</p>`
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        }); 
    };
});
