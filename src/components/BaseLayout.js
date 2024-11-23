import React, { useEffect, useState } from 'react';
import Style from './BaseLayout.module.scss'
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import MultiPageRoutes from './MultiPageRoutes';
import SinglePageRoutes from './SinglePageRoutes';
import useScrollObserver from '../hooks/useScrollObserver';

export default function BaseLayout() {
   const location = useLocation();

   const [active, setActive] = useState(location.pathname === '/' ? 'home' : location.pathname.slice(1, location.pathname.length));
   const refHome = useScrollObserver(setActive);
   const refAbout = useScrollObserver(setActive);
   const refPortfolio = useScrollObserver(setActive);
   const refResume = useScrollObserver(setActive);
   let [darkMode, setDarkMode] = useState(false);
   let [singlePage, setSinglePage] = useState(false);

   function handleToggleDarkMode() {
      console.log(!darkMode)
      localStorage.setItem('darkMode', `${!darkMode}`)
      setDarkMode(!darkMode)
   }

   function handleToggleSinglePage() {
      console.log(!singlePage)
      localStorage.setItem('singlePage', `${!singlePage}`)
      setSinglePage(!singlePage)
      if (!singlePage) {
         const currentHeader = location.hash;
         window.history.pushState({}, '', location.pathname + currentHeader.replace('#', ''));
      }
      setActive(location.pathname === '/' ? 'home' : location.pathname.slice(1, location.pathname.length))
   }

   useEffect(() => {
      let detectedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
      if (detectedDarkMode) {
         setDarkMode(detectedDarkMode)
      } else {
         localStorage.setItem('darkMode', 'false')
      }
   }, []);

   useEffect(() => {
      let detectedSinglePage = JSON.parse(localStorage.getItem('singlePage'));
      if (detectedSinglePage) {
         setSinglePage(detectedSinglePage)
      } else {
         localStorage.setItem('singlePage', 'false')
      }
   }, []);

   useEffect(() => {
      // this will run when the component mounts, and when darkMode changes
      if (document.getElementById("chainlit-copilot")) {
         console.log("should remove old component here")
         document.body.removeChild(document.getElementById("chainlit-copilot"));
      }
      const script = document.createElement("script");
      script.src = `${process.env.REACT_APP_CHAINLIT_URL}/copilot/index.js`;
      console.log(script.src)
      script.async = true;
      document.body.appendChild(script);

      // Initialize the Chainlit widget after the script is loaded
      script.onload = () => {
         window.mountChainlitWidget({
            chainlitServer: process.env.REACT_APP_CHAINLIT_URL,
            theme: darkMode ? "dark" : "light",
            button: {
               style: {
                  color: darkMode ? "black" : "white",
                  bgcolor: darkMode ? "white" : "black",
                  bgcolorHover: darkMode ? "#696969" : "grey",
               }

            }

         });

         // Add custom event listener for the widget
         window.addEventListener("chainlit-call-fn", (e) => {
            const { name, args, callback } = e.detail;
            if (name === "test") {
               callback("You sent: " + args.msg);
            }
         });
      };

      // Clean up the script and event listener on unmount
      return () => {
         document.body.removeChild(script);
         window.removeEventListener("chainlit-call-fn", () => {});
      };
   }, [darkMode]);

   return (
      <Box className={darkMode ? Style.dark : Style.light}>
         <Grid container display={'flex'} flexDirection={'column'} minHeight={'100vh'}
            justifyContent={'space-between'}>
            <Grid item>
               <Navbar darkMode={darkMode} singlePage={singlePage} handleClick={handleToggleDarkMode} handleSinglePage={handleToggleSinglePage} active={active} setActive={setActive} />
            </Grid>
            <Grid item flexGrow={1}>
               {singlePage ? <SinglePageRoutes refs={{refHome, refAbout, refPortfolio, refResume}}/> : <MultiPageRoutes />}
            </Grid>
            <Grid item>
               <Box id="footer123" component={'footer'} display={'flex'} flexDirection={'column'} alignItems={'center'}
                  py={'1.5rem'} sx={{ opacity: 0.7 }} width={'100%'}>
                  <p>Timothy Leow &copy; 2024</p>
               </Box>
            </Grid>
         </Grid>
      </Box>
   );
}
