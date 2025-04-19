import Memory from "./components/Memory";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#282c34",
      }}
    >
      <Memory />
    </div>
  );
}

export default App;
