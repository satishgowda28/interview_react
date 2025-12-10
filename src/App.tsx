import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router";
import IndexPage from "./pages";
import AutoCompleteInput from "./pages/automcomplete";
import ChessMoves from "./pages/chessMoves";
import FolderStruct from "./pages/folderStruct";
import InteractiveShape from "./pages/interactiveShape";
import NestedCheckbox from "./pages/nestedcheckbox";
import OTPWrapper from "./pages/otp";
import OverLappingCircles from "./pages/overlappingCircles";
import Pagination from "./pages/pagination";
import Root from "./pages/rootLayout";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<IndexPage />} />
            <Route path="/folderStruct" element={<FolderStruct />} />
            <Route path="/interactiveShape" element={<InteractiveShape />} />
            <Route
              path="/overlappingCircles"
              element={<OverLappingCircles />}
            />
            <Route path="/autocomplete" element={<AutoCompleteInput />} />
            <Route path="/otpio" element={<OTPWrapper />} />
            <Route path="/nestedcheckbox" element={<NestedCheckbox />} />
            <Route path="/chessmoves" element={<ChessMoves />} />
            <Route path="/pagination" element={<Pagination />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
