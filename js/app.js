//fetching data from coinmarket cap API
//set limit to 0 to get all cryptocurrency available
fetch("https://api.coinmarketcap.com/v1/ticker/?limit=20")
  .then((res) => res.json())
  .then((res) => {
    // console.log(res.length);
    res.forEach((elem) => {
      // console.log(elem.id);
      let d =  Date.now();
      let m = d / 60000;
      let s = m * 60;
      //coinmarket cap last update come is seconds from midnight 1st jan 1970 this function converts to current minute differens from local time
      let updatedSeconds = s - elem.last_updated;

      // console.log(s);
      // console.log(elem.last_updated);
      let xx = d - elem.last_updated;
      function secondsToMinutes(sec) {
        let minutes = (sec / 60).toFixed(2);
        return minutes;
      }
      // NOTE this conversion is not dynamic , great contribution needed here
      const dollarToNaira = (dollar) => {
          let naira = dollar * 360;
          var seperated = naira.toLocaleString();
          return seperated;
      }
      const dollarReal = (dollar2) => {
        var sp = dollar2 * 1;
        var sp2 = sp.toLocaleString();
        return sp2;
      }
      let i,j,k = 0; // trying to make percentage change more visual by taking negative as red and positive as green not working yet
      $('tbody').append(`
          <tr>
            <th scope="row">${elem.rank}</th>
            <td>${elem.name}(${elem.symbol})</td>
            <td>$${dollarReal(elem.price_usd)}</td>
            <td>#${dollarToNaira(elem.price_usd)}</td>
            <td>${elem.price_btc}</td>
            <td id="${++i}">${elem.percent_change_1h}</td>
            <td id="${++j}">${elem.percent_change_24h}</td>
            <td id="${++k}">${elem.percent_change_7d}</td>
            <td>${secondsToMinutes(updatedSeconds)}minutes</td>
          </tr>
        `)
        if (elem.percent_change_1h < 0) {
            $(`#${i}`).addClass('textRedI');
        }else{
          $(`#${i}`).addClass('textGreenI');
        }
        if (elem.percent_change_24h < 0) {
            $(`#${j}`).addClass('textRedI');
        }else{
          $(`#${j}`).addClass('textGreenI');
        }
        if (elem.percent_change_7d < 0) {
            $(`#${k}`).addClass('textRedI');
        }else{
          $(`#${k}`).addClass('textGreenI');
        }
    });
  });
