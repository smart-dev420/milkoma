import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient, useQuery } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import store from './store';
import { CircularProgress } from "@mui/material";
import { createState } from "state-pool";
import { ToastContainer } from "react-toastify";
import { SnackbarProvider } from "notistack";
import Box from '@mui/material/Box';
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Suspense
            fallback={
              <Box
                sx={{
                  display: 'flex',
                  minWidth: 0,
                  alignItems: 'center',
                  alignContent: 'center',
                  height: '100%',
                }}
              >
                <CircularProgress sx={{ m: '-40px auto 0' }} />
              </Box>
            }
          >
            <ToastContainer />
            <SnackbarProvider
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              maxSnack={3}>
            </SnackbarProvider>
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </QueryClientProvider>
    );
}

export default App;
