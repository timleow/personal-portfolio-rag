import React, { useEffect, useState } from 'react';
import Style from './BaseLayout.module.scss'
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import MultiPageRoutes from './MultiPageRoutes';
import SinglePageRoutes from './SinglePageRoutes';
import useScrollObserver from '../hooks/useScrollObserver';

// Define the event handler outside the component so we can add and remove the same function reference.
const handleChainlitCall = (e) => {
   const { name, args, callback } = e.detail;
   if (name === "test") {
      callback("You sent: " + args.msg);
   }
};

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
      localStorage.setItem('darkMode', `${!darkMode}`)
      setDarkMode(!darkMode)
   }

   function handleToggleSinglePage() {
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
      // This effect handles the mounting and unmounting of the Chainlit widget.
      // It re-runs every time the `darkMode` state changes.

      const script = document.createElement("script");
      // Give the script an ID for easier and more reliable removal.
      script.id = 'chainlit-copilot-script';
      script.src = `${process.env.REACT_APP_CHAINLIT_URL}/copilot/index.js`;
      script.async = true;
      document.body.appendChild(script);

      // Initialize the Chainlit widget after the script is loaded
      script.onload = () => {
         if (window.mountChainlitWidget) {
            window.mountChainlitWidget({
               chainlitServer: process.env.REACT_APP_CHAINLIT_URL,
               theme: darkMode ? "dark" : "light",
               button: {
                  style: {
                     // Programmatically set colors based on darkMode state
                     color: darkMode ? "black" : "white", // Icon color
                     backgroundColor: darkMode ? "white" : "black", // Button background
                     // Note: Chainlit uses 'backgroundColor', not 'bgcolor'
                  }
               }
            });
            // Add the event listener using our named function
            window.addEventListener("chainlit-call-fn", handleChainlitCall);
         }
      };

      // This is the cleanup function. It runs before the effect runs again,
      // and also when the component unmounts.
      return () => {
         // 1. Remove the widget's main container div
         const widgetContainer = document.getElementById("chainlit-copilot");
         if (widgetContainer && widgetContainer.parentNode) {
            widgetContainer.parentNode.removeChild(widgetContainer);
         }

         // 2. Remove the script we added
         const scriptElement = document.getElementById('chainlit-copilot-script');
         if (scriptElement && scriptElement.parentNode) {
            scriptElement.parentNode.removeChild(scriptElement);
         }
         
         // 3. If the widget ever provides an official unmount function, call it (defensive check)
         if (window.unmountChainlitWidget) {
            window.unmountChainlitWidget();
         }

         // 4. Correctly remove the event listener using the named function
         window.removeEventListener("chainlit-call-fn", handleChainlitCall);
      };
   }, [darkMode]); // The effect re-runs whenever darkMode changes

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

