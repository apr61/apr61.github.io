# Frontend Mentor - Intro section with dropdown navigation solution

This is a solution to the [Intro section with dropdown navigation challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/intro-section-with-dropdown-navigation-ryaPetHE5). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I Learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout depending on their device's screen size
- See hover and focus states for interactive elements

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: [Solution URL](https://github.com/apr61/apr61.github.io/tree/main/junior/intro-section-with-dropdown-navigation-main)
- Live Site URL: [Live site URL](https://apr61.github.io/junior/intro-section-with-dropdown-navigation-main)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow

### What I Learned

```html
	<div class="dropdown features-dropdown">
		<button>Features
			<img src="./images/icon-arrow-down.svg" class="arrow" alt="arrow down">
		</button>
		<div class="dropdown-content">
			<a href="#"><img src="./images/icon-todo.svg" alt="Todo" class="icons">Todo&nbsp;List</a>
			<a href="#"><img src="./images/icon-calendar.svg" alt="Calander" class="icons">Calander</a>
			<a href="#"><img src="./images/icon-reminders.svg" alt="Reminders"class="icons">Reminders</a>
			<a href="#"><img src="./images/icon-planning.svg" alt="Planning" class="icons">Planning</a>
		</div>
	</div>
```

```css
	nav ul li:nth-of-type(6){
		text-align: center;
		padding: .5rem;
		border: 2px solid var(--clr-neutral-m-gray);
		border-radius: .75rem;
	}
	.dropdown button{
		cursor: pointer;
		border: 0;
		background-color: transparent;
		color: var(--clr-neutral-m-gray);
		font-size: 1rem;
	}

	.dropdown-content{
		display: none;
		padding: 1.5rem;
		flex-direction: column;
		gap: 1rem;
	}

	.show-dropdown{
		display: flex;
	}

```

```js
	featuresDropdown.addEventListener('click', () => {
		const dropdown = featuresDropdown.querySelector('.dropdown-content');
		dropdown.style.right = 0;
		dropdown.classList.toggle('show-dropdown');
	})
```

## Author

- Frontend Mentor - [@apr61](https://www.frontendmentor.io/profile/apr61)
- Twitter - [@apradeepreddy9](https://www.twitter.com/apradeepreddy9)
