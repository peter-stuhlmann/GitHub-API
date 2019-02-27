"use strict";

function github_api() {

    // USER

    let inputUserName = document.querySelector('#input').value || 'peter-stuhlmann'
    fetch(`https://api.github.com/users/${inputUserName}?client_id=25bb194b081525d08147&client_secret=85f00c5312adc3596dbbc4c15ae7db009e99f9e5`)
        .then(
            response => response.json()
        )
        .then(
            user => {
                let userInfos = [];

                if (user.name == null) {
                    user.name = ""
                }
                if (user.bio == null) {
                    user.bio = ""
                }
                if (user.location == null) {
                    user.location = ""
                }
                if (user.email == null) {
                    user.email = ""
                }
                if (user.blog == null) {
                    user.blog = ""
                }

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
                document.querySelector('#userlogin').innerHTML = `<img src="${user.avatar_url}"><i class="fas fa-caret-down"></i>`
            },
        )
        .catch(
            err => console.log(`panic: ${err}`)
        )



    // REPOSITORIES

    fetch(`https://api.github.com/users/${inputUserName}/repos?client_id=25bb194b081525d08147&client_secret=85f00c5312adc3596dbbc4c15ae7db009e99f9e5`)
        .then(
            response => response.json()
        )
        .then(
            repos => {
                let repoList = [];
                let repoListMore = [];
                repos.slice(0, 4).forEach(
                    repo => {

                        if (repo.description == null) {
                            repo.description = "&nbsp;"
                        }

                        repoList.push(`
                        <li><a class="name" title="Redirect to github.com" target="_blanc" href="${repo.html_url}">${repo.name}</a>
                            <div class="description">${repo.description}</div>
                            <span><i class="fas fa-circle">&nbsp;</i>${repo.language}</span>
                            <span><i class="fas fa-star">&nbsp;</i>${repo.stargazers_count}</span>
                            <span><i class="fas fa-code-branch">&nbsp;</i>${repo.forks}</span>
                        </li>                    
                    `)
                    }
                )
                document.querySelector('.gh_repositories').innerHTML = repoList.join('')

                repos.slice(4).forEach(
                    repo => {

                        if (repo.description == null) {
                            repo.description = "&nbsp;"
                        }

                        repoListMore.push(`
                        <li><a class="name" title="Redirect to github.com" target="_blanc" href="${repo.html_url}">${repo.name}</a>
                            <div class="description">${repo.description}</div>
                            <span><i class="fas fa-circle">&nbsp;</i>${repo.language}</span>
                            <span><i class="fas fa-star">&nbsp;</i>${repo.stargazers_count}</span>
                            <span><i class="fas fa-code-branch">&nbsp;</i>${repo.forks}</span>
                        </li>                    
                    `)
                    }
                )
                document.querySelector('#more-repositories').addEventListener('click', function () {
                    document.querySelector('.gh_repositories-more').innerHTML = repoListMore.join('')
                    document.querySelector('#more-repositories').style.display = "none"
                });
            },
        )
        .catch(
            err => console.log(`panic: ${err}`)
        )
}

github_api()
document.querySelector('#input-search').addEventListener('click', github_api)



// MAIN NAV

function openTab(tabName) {
    var i;
    var x = document.querySelector('.tab');
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.querySelector('#tabName').style.display = "block";
}