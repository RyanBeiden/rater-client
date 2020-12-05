const getGames = () => new Promise((resolve, reject) => {
  fetch("http://localhost:8000/games", {
    method: 'GET',
    headers:{
      "Authorization": `Token ${localStorage.getItem("gr_token")}`
    }
  })
  .then((response) => resolve(response.json()))
  .catch((err) => reject(err));
});

const getSingleGame = (gameId) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/games/${gameId}`, {
    method: 'GET',
    headers:{
      "Authorization": `Token ${localStorage.getItem("gr_token")}`
    }
  })
  .then((response) => resolve(response.json()))
  .catch((err) => reject(err));
});

export default { getGames, getSingleGame }
