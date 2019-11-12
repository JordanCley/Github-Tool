const colors = {
  green: {
    cardBackground: "green",
    photoBorderColor: "green"
  },
  blue: {
    cardBackground: "blue",
    photoBorderColor: "blue"
  },
  pink: {
    cardBackground: "pink",
    photoBorderColor: "pink"
  },
  purple: {
    cardBackground: "purple",
    photoBorderColor: "purple"
  },
  orange: {
    cardBackground: "orange",
    photoBorderColor: "orange"
  },
  yellow: {
    cardBackground: "#E1E143",
    photoBorderColor: "#E1E143"
  },
  red: {
    cardBackground: "red",
    photoBorderColor: "red"
  }
};

function generateHTML(response, answers, starNums) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
    <title>Developer Stats</title>
</head>
<body>

<style>

@page {
  margin: 0;
}
*::after,*::before {
  box-sizing: border-box;
}
html, body {
  padding: 0;
  margin: 0;
}
html, body, .wrapper {
  height: 100%;
}
.wrapper {
  background-color: white;
  padding-top: 100px;
}

body {
  background-color: white;
  -webkit-print-color-adjust: exact !important;
  font-family: 'Cabin', sans-serif;
}
/* main {
  background-color: #E9EDEE;
  height: auto;
  padding-top: 30px;
} */

h1, h2, h3, h4, h5, h6 {
  font-family: 'BioRhyme', serif;
  margin: 0;
}
h1 {
  font-size: 3em;
}
h2 {
  font-size: 2.5em;
}
h3 {
  font-size: 1.5em;
}
h4 {
  font-size: 1.5em;
}
h5 {
  font-size: 1.3em;
}
h6 {
  font-size: 1.2em;
}
.photo-header {
  position: relative;
  margin: 0 auto;
  margin-bottom: -50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color:grey;
  color: white;
  padding: 10px;
  width: 95%;
  border-radius: 6px;
}
.photo-header img {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: -75px;
  border: 6px solid ${colors[answers.stack].photoBorderColor};
  box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
}
.photo-header h1, .photo-header h2 {
  width: 100%;
  text-align: center;
}
.photo-header h1 {
  margin-top: 10px;
}
.links-nav {
  width: 100%;
  text-align: center;
  padding: 20px 0;
  font-size: 1.1em;
}
.nav-link {
  display: inline-block;
  margin: 5px 10px;
}
.workExp-date {
  font-style: italic;
  font-size: .7em;
  text-align: right;
  margin-top: 10px;
}
.container {
  padding: 50px;
  padding-left: 100px;
  padding-right: 100px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
}

.card {
  padding: 20px;
  border-radius: 6px;
  background-color: ${
    colors[answers.stack].cardBackground
  }; /*  change with picked color*/
  color:white;
  margin: 20px;
}
         
.col {
  flex: 1;
  text-align: center;
}

a, a:hover {
  text-decoration: none;
  color: inherit;
  font-weight: bold;
}

@media print { 
  body { 
    zoom: .7} 
}

</style>

  <div class="wrapper">
    <div class="card">
      <div class="photo-header">
        <img src="${response.data.avatar_url}" alt="">
        <h2>My name is ${response.data.name}!</h2>
        <div class="links-nav">
          <a 
            class="nav-link" 
            href="https://www.google.com/maps/place/${response.data.location}">
              <i class="fas fa-location-arrow"></i> ${response.data.location}
          </a>
          <a class="nav-link" href="${response.data.html_url}">
            <i class="fab fa-github"></i>
               Github
          </a>
          <a class="nav-link" href="${response.data.blog}">
            <i class="fas fa-blog"></i>
               blog
          </a>
        </div>
      </div>
    </div>
                
    <div class="col container">
      <h2>${response.data.bio}</h2>
      <div class="row">
        <div class="col card">
          <h3>Public Repositories</h3>
          <h4>${response.data.public_repos}</h4>
        </div>
        <div class="col card">
          <h3>Followers</h3>
          <h4>${response.data.followers}</h4>
        </div>
      </div>
                
      <div class="row">
        <div class="col card">
          <h3>Github Stars</h3>
          <h4>${starNums}</h4>
        </div>
        <div class="col card">
          <h3>Following</h3>
          <h4>${response.data.following}</h4>
        </div>
      </div>
    </div>
          
    <div class="card">
      <div class="container"></div>
    </div>
  </div>

    
</body>
</html>`;
}

module.exports = {
  colors: colors,
  generateHTML: generateHTML
};
