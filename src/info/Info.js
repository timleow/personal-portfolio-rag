import self from "../img/self.png"
import mock1 from "../img/mock1.png"
import mock2 from "../img/mock2.png"
import mock3 from "../img/mock3.png"
import mock4 from "../img/mock4.png"
import mock5 from "../img/mock5.png"

/* Hi there! Thanks for checking out my portfolio template. Be sure to read the comments to get a better understanding of
how to make this template work best for you! */

export let colors = ["rgb(0,25,100)", "rgb(0,255,200)"];

/* 
This variable will change the layout of the website from multipage to single, scrollable page
*/
export let singlePage = true;

/*
So let's get started! Some of the info below is pretty self-explanatory, like 'firstName' and 'bio'. I'll try to explain anything
that might not be obvious right off the bat :) I recommend looking at the template example live using "npm start" to get an idea
of what each of the values mean.
 */

export const info = {
    firstName: "Timothy",
    lastName: "Leow",
    initials: "tl", // the example uses first and last, but feel free to use three or more if you like.
    position: "NUS Computer Science Undergraduate",
    hobbyPosition: "Jazz Saxophonist",

    selfPortrait: self, // don't change this unless you want to name your self-portrait in the "img" folder something else!
    gradient: `-webkit-linear-gradient(135deg, ${colors})`, // don't change this either
    baseColor: colors[0],
    miniBio: [ // these are just some "tidbits" about yourself. You can look at mine https://paytonjewell.github.io/#/ for an example if you'd like
        {
            emoji: '🇸🇬',
            text: 'Singaporean'
        },
        {
            emoji: "🇸🇪",
            text: "on exchange at Uppsala University"
        },
        {
            emoji: "🤖",
            text: "interested in LLMs and AI"
        },
        {
            emoji: "🎶",
            text: "loves straight-ahead jazz, bebop, funk, and modern hip-hop"
        },
        //TODO add resume link
    ],
    socials: [
        {
            link: "https://github.com/timleow",
            icon: "fa fa-github",
            label: 'github'
        },
        {
            link: "https://www.linkedin.com/in/timothy-leow-94193a1b8/",
            icon: "fa fa-linkedin",
            label: 'linkedin'
        },
        {
            link: "https://open.spotify.com/user/11182937027?si=1bda03a40b1a4429",
            icon: "fa fa-spotify",
            label: 'spotify'
        },


    ],
    bio: "Hello! I'm Timothy. In the day, I enjoy work with AI, Machine Learning and LLMs in the day. At night, you might find me at a jazz jam playing the saxophone.",
    skills:
        {
            proficientWith: ['Flask', 'vLLM', 'LangChain', 'Transformers'],
            exposedTo: ['']
        }
    ,
    hobbies: [
        {
            label: 'music',
        },
        {
            label: 'coding',
        },
    ],
    portfolio: [ // This is where your portfolio projects will be detailed
        {
            title: "Project 1",
            live: "https://paytonpierce.dev", //this should be a link to the live version of your project, think github pages, netlify, heroku, etc. Or your own domain, if you have it.
            source: "https://github.com/paytonjewell", // this should be a link to the **repository** of the project, where the code is hosted.
            image: mock1
        },
        {
            title: "Project 2",
            live: "https://paytonpierce.dev",
            source: "https://github.com/paytonjewell",
            image: mock2
        },
        // {
        //     title: "Project 3",
        //     live: "https://paytonpierce.dev",
        //     source: "https://github.com/paytonjewell",
        //     image: mock3
        // },
        // {
        //     title: "Project 4",
        //     live: "https://paytonpierce.dev",
        //     source: "https://github.com/paytonjewell",
        //     image: mock4
        // },
        // {
        //     title: "Project 5",
        //     live: "https://paytonpierce.dev",
        //     source: "https://github.com/paytonjewell",
        //     image: mock5
        // }
    ]
}