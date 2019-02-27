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
                <div id="gh_location"><i class="fas fa-map-marker-alt">&nbsp;</i>${user.location}</div>
                <div id="gh_email"><i class="fas fa-envelope">&nbsp;</i><a href="mailto:${user.email}">${user.email}</a></div>
                <div id="gh_blog"><i class="fas fa-link">&nbsp;</i><a href="${user.blog}">${user.blog}</a></div>
            `)
            document.querySelector('aside').innerHTML = userInfos.join('')
            document.querySelector('#reposNumber').innerHTML = `(${user.public_repos})`
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
                            <div>${repo.description}</div>
                            <div><i class="fas fa-circle">&nbsp;</i>${repo.language}</div>
                            <div><i class="fas fa-star">&nbsp;</i>${repo.stargazers_count}</div>
                            <div><i class="fas fa-code-branch">&nbsp;</i>${repo.forks}</div>
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
