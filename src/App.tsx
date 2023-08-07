import PointsInputTable from "./components/PointsInputTable";

function App() {
  return (
    <div className="m-10 mx-20 tracking-wide">
      <h1 className="text-3xl font-bold underline text-center">RenderRama</h1>
      <div className="grid grid-cols-8 gap-4 mt-5">
        <div className="w-full">
          <PointsInputTable />
        </div>
        <div className="bg-green-100 col-span-5">Canvas</div>
        <div className="bg-sky-100 col-span-2">Translate</div>
      </div>
    </div>
  );
}

export default App;
