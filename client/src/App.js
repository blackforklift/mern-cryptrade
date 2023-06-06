
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Transactions from "scenes/transactions"
import SBots from "scenes/SBots";

import News from "scenes/news";
import Prediction from "scenes/predictions";


function App() {

  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
   
    <div className="app">

    <BrowserRouter>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
             {/* layout elementini biz yazacağız layout compenentini içeren her route  layout elementini içerecek( her sayfada navbar ve sidebar olması için) */}
          <Route element={<Layout />}>    
            <Route path="/" element={<Navigate to="/anasayfa" replace />}/>  {/* ana dizine geldiğinde bizi hep dashboard route'a yönlendirsin */}
            <Route path="/anasayfa" element={<Dashboard />} /> { /* Dashboard componentini renderlesin*/}
            <Route path="/alimsatimgecmisim" element={<Transactions />} />
            <Route path="/stratejirobotlari" element={<SBots />} />
            <Route path="/i̇slemgecmisi" element={<Prediction />} />
            <Route path="/haberler" element={<News />} />
            
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
