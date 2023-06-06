import React from "react";

const getArticles = async () => {
  try {
    const response = await fetch(
      'https://newsdata.io/api/1/news?apikey=pub_23369fed7d2b4fc5babb129822817e3568727&q=crypto&language=tr'
    );
    const data = await response.json();
 
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export default getArticles();