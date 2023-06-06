
import {Users} from "../models/User.js";
import IncomeHistory from "../models/IncomeHistory.js";


export const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Users.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };



 export const getProfits = async (req, res) => {
    try {
      
      const pnls = await IncomeHistory.find({ incomeType: "REALIZED_PNL" });
      res.status(200).json(pnls);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export const getArticles = async (req, res) => {
    try {
      const apiKey = 'pub_23369fed7d2b4fc5babb129822817e3568727';
      const language = 'tr';
      const baseUrl = 'https://newsdata.io/api/1/news';
      const search = req.query.search || "kripto";
  
      // Arama sorgusu ile URL oluşturma
      const url = `${baseUrl}?apikey=${apiKey}&q=${encodeURIComponent(search)}&language=${language}`;
  
      const response = await fetch(url);
      const data = await response.json();
  
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Haberleri alırken bir hata oluştu.' });
    }
  };
  

