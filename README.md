<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
 <br />
<div align="center">


<h3 align="center">MoveWeights</h3>

  <p align="center">
    MoveWeights a mobile-first full stack web application for tracking workouts and providing analytics for workout/exercise history.
    <br />
    <a href="https://github.com/jarrodmjack/MoveWeights"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://move-weights.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/jarrodmjack/MoveWeights/issues">Report Bug</a>
    ·
    <a href="https://github.com/jarrodmjack/MoveWeights/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
![Screenshot 2023-08-03 114114](https://github.com/jarrodmjack/MoveWeights/assets/99290888/2c2ff736-8274-4c6c-bc04-c973dd5a012b)





<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With


- NextJS
- TypeScript
- Tailwind
- Node/Express
- MongoDB
- JWT Auth


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/jarrodmjack/MoveWeights.git
   ```
2. Install NPM packages
   ```sh
   cd frontend
   npm install
   cd backend
   npm install
   ```
3. These are the environment variables needed to run the project
   ```sh
   Backend:
     PORT = <WHATEVER PORT NUMBER YOU WANT>
     MONGO_URI = <MONGO DATABASE STRING PROVIDED BY ME>
     SECRET = <AUTH SECRET PROVIDED BY ME>
   Frontend:
     NEXT_PUBLIC_API_URL = http://localhost:4001
     NODE_ENV=development
   ```
4. Running the project
  ```sh
    Open two separate terminals. One for the frontend, one for the backend
    in one terminal -> cd frontend -> npm run dev
    in the other terminal -> cd backend -> npm run dev
  ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Host project on Vercel
- [ ] Make more responsive for bigger screens (is being built mobile-first)
- [ ] Fix issues with Auth and redirection
- [ ] Add workout history and analytics

See the [open issues](https://github.com/jarrodmjack/MoveWeights/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

[@jarrodmjack](https://twitter.com/jarrodmjack) - jarrodmjack@gmail.com

[https://github.com/jarrodmjack/MoveWeights](https://github.com/jarrodmjack/MoveWeights)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/jarrodmjack/MoveWeights.svg?style=for-the-badge
[contributors-url]: https://github.com/jarrodmjack/MoveWeights/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jarrodmjack/MoveWeights.svg?style=for-the-badge
[forks-url]: https://github.com/jarrodmjack/MoveWeights/network/members
[stars-shield]: https://img.shields.io/github/stars/jarrodmjack/MoveWeights.svg?style=for-the-badge
[stars-url]: https://github.com/jarrodmjack/MoveWeights/stargazers
[issues-shield]: https://img.shields.io/github/issues/jarrodmjack/MoveWeights.svg?style=for-the-badge
[issues-url]: https://github.com/jarrodmjack/MoveWeights/issues
[license-shield]: https://img.shields.io/github/license/jarrodmjack/MoveWeights.svg?style=for-the-badge
[license-url]: https://github.com/jarrodmjack/MoveWeights/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/jarrodmjack
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
