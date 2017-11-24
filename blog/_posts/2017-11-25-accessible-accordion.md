---
layout: post
title:  "Accessible Accordion Menu"
date:   2017-11-24 21:48:20 +0100
categories: code
---

I recently had to make an FAQ page. The task itself was quite straight forward, I had to create a accordion list with questions. When you clicked on a question, the answer associated to it would show. 
  
We use php and I had an array called 'faq' containing all the questions and answers and in the markup, I did an foreach loop to generate all the questions and answers on the page. 

```
<ol class="reset-list">
    <?php foreach ($faq as $key=>$value) :?>
        <li class="faq-page__list-item">
            <button class="heading faq-question"  data-count="<?php echo $key ?>">
                <?php echo $value['question'] ?>
            </button>
            <div class="faq-answer" id="faq-<?php echo $key ?>">
                <p><?php echo $value['answer'] ?></p>
            </div>
        </li>
    <?php endforeach; ?>
</ol>

```

I am using the `$key` as a way to assign the questions & answers an index to later use in JavaScript. For example, the first `.faq-question` will have `data-count="0"` and  `.faq-answer` will have an id of `faq-0`.

In CSS, the `.faq-answer` is set to `height:0` and I use JavaScript to toggle a class to be able to change this to `height: auto` once the question is clicked. 

This is the JavaScript function. 

```
// Get all questions for loop
    var questions = document.getElementsByClassName('faq-question'),
        question;

    for (var i = 0; i < questions.length; i++){

        //Separate each question
        question = questions[i];

        function questionOpen(){

            // Get the answer that matches with the question by using count
            var count = this.getAttribute('data-count'),
                answer = document.getElementById('faq-'+count);

            // Show the answer
            this.parentElement.classList.toggle('question-open');
 
        }

        question.addEventListener('click', questionOpen);
    }

```
I get all the elements with the class `.faq-question` and loop over each one. Inside this loop, I have added the function that toggles the class together with an event listener. This is how I managed to used data-count together with the `.faq-answer` id.

``
var count = this.getAttribute('data-count'),
    answer = document.getElementById('faq-'+count);
``
 
I am getting the attribute data-count from this (which is the question we just clicked) and then use it to get the answer with the same number `document.getElementById('faq-'+count)`.
 
 
Currently we are just adding a class to the parent element of this (which will be the ` <li> ` of the question we clicked). We are not even using our answer variable yet. But we are about to. 

### Accessibility 

Something new I learned doing this was ARIA attributes that you use with content that expands and hides. This is our updated html with the aria attributes added.
 
 ````
 <ul aria-label="List of Frequently Asked Questions" class="reset-list">
            <?php foreach ($faq as $key=>$value) :?>
                <?php $number = $key +1; ?>
                <li aria-controls="faq-<?php echo $key?>" aria-expanded="false" class="faq-page__list-item">
                    <button class="heading faq-question" data-count="<?php echo $key ?>">
                        <span class="faq-question__number"><?php echo $number ?></span>
                        <?php echo $value['question'] ?>
                    </button>
                    <div class="faq-answer" aria-hidden="true" id="faq-<?php echo $key ?>">
                        <p><?php echo $value['answer'] ?></p>
                    </div>
                </li>
            <?php endforeach; ?>
        </ul>
````

We have added `aria-label`, `aria-controls`, `aria-expanded` and `aria-hidden`. 

* `aria-expanded` is on our `<li>` and is by default `false` as all questions are closed once the page is loaded.

* `aria-hidden` is on our answer and is by default `true` as the answers elements all have a height of 0. 

Now we need to update our JavaScript function to make sure that these attributes update once the question is expanded and the answer is showing. 

````
function questionClick(){

    // Get the answer that matches with the question by using count
    var count = this.getAttribute('data-count'),
        answer = document.getElementById('faq-'+count);

    // Update ARIA attr and show the answer
    this.parentElement.classList.toggle('question-open');
    
    this.parentElement.setAttribute('aria-expanded', 'true');
    answer.setAttribute('aria-hidden', 'false');
}
````
We update the aria attributes inside the click function by using `setAttribute`. 

But now that means that once we clicked it, it will stay `aria-expanded = "true"` and `aria-hidden = "false"`, even if we close it! Oh no! We need another function to check if the question actually is expanded or not.

```javascript

function setAriaAttr() {
    var openQuestion = document.querySelectorAll('.faq-page__list-item[aria-expanded=true]'),
        openAnswer = document.querySelectorAll('.faq-answer[aria-hidden=false]');

    for (var i = 0; i < openQuestion.length; i++){

        if(!openQuestion[i].classList.contains('question-open')){
            openQuestion[i].setAttribute('aria-expanded', false);
            openAnswer[i].setAttribute('aria-hidden', true);
        }
    }
}
```

We get all the `<li>` elements that have the attribute `aria-expanded=true` and `.faq-answer` that have `aria-hidden=false`. We loop through all our `<li>` elements and if the `<li>` doesn't have the class `.open-question` (that we toggle in our click function), set the attributes back to default. 

Lastly, we update our click function to run this check on every click.

```` 
function questionClick(){

    // Get the answer that matches with the question by using count
    var count = this.getAttribute('data-count'),
        answer = document.getElementById('faq-'+count);

    // Update ARIA attr and show the answer
    this.parentElement.classList.toggle('question-open');
    this.parentElement.setAttribute('aria-expanded', 'true');
    answer.setAttribute('aria-hidden', 'false');

    //reset ARIA attr
    setAriaAttr();
}
````

And that should do the trick. I really enjoyed learning this and look forward to expanding my knowledge even more about accessibility on the web.