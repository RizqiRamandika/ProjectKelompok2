import TambahProduk from './TambahProduc';
import { useState } from "react"

function App() {

  const [isRefresh, setIsRefresh] = useState(true);
  const setRefresh = (status) => {
    setIsRefresh(status);
  };

  return (
      <div>
        <TambahProduk setRefresh={setRefresh} isRefresh={isRefresh} />
      </div>
  );
}

export default App;