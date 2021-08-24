//Where profile info will appear
const overviewDiv = document.querySelector(".overview");
const username = "Framos310"
const repoList = document.querySelector(".repo-list")

const getData = async function(){
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    //console.log(data);
    displayUserInfo(data)
}
getData();


const displayUserInfo = function(data){
    const div = document.createElement("div")
    div.classList.add("user-info")
    div.innerHTML = `
    <figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overviewDiv.append(div)
    fetchRepos()
}

const fetchRepos = async function(){
    const gitRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
    const data = await gitRepos.json()
    //console.log(data)
    displayRepoInfo(data)
}

const displayRepoInfo = function(repos){
    for(const repo of repos){
        const repoItem = document.createElement("li")
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
}