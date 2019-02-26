"use strict";

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
                        <!-- Content -->
                    `)
                }
            )

            document.querySelector('.repositories').innerHTML = repoList.join('')
        }
    )
    .catch(
        err => console.log(`panic: ${err}`)
    )