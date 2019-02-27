"use strict";

// USER

fetch("https://api.github.com/users/peter-stuhlmann?client_id=25bb194b081525d08147&client_secret=85f00c5312adc3596dbbc4c15ae7db009e99f9e5")
    .then(
        response => response.json()
    )
    .then(
        user => {
            let userInfos = [];
            userInfos.push(`
                <img id="gh_avatar" src="${user.avatar_url}">  
                <div id="gh_username">${user.name}</div>
                <div id="gh_login">${user.login}</div>
                <div id="gh_bio">${user.bio}</div>
                <div id="gh_location">${user.location}</div>
                <div id="gh_email">${user.email}</div>
                <div id="gh_blog">${user.blog}</div>
            `)

            document.querySelector('aside').innerHTML = userInfos.join('')
        },
    )
    .catch(
        err => console.log(`panic: ${err}`)
    )









// REPOSITORIES

fetch("https://api.github.com/users/peter-stuhlmann/repos?client_id=25bb194b081525d08147&client_secret=85f00c5312adc3596dbbc4c15ae7db009e99f9e5")
    .then(
        response => response.json()
    )
    .then(
        repos => {
            let repoList = [];
            repos.forEach(
                repo => {
                    repoList.push(`
                        <li><a class="name" title="Redirect to github.com" target="_blanc" href="${repo.html_url}">${repo.name}</a>
                            <ul>
                                <li>${repo.description}</li>
                            </ul>
                        </li>                    
                    `)
                }
            )

            document.querySelector('.gh_repositories').innerHTML = repoList.join('')
        },
    )
    .catch(
        err => console.log(`panic: ${err}`)
    )
