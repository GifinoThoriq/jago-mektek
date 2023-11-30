import { Button } from "@/app/_ui/Button";
import { CardHorizontal } from "@/app/_ui/CardHorizontal";
export default function materiBelajar() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="w-full mx-auto text-center">
        <h1 className="text-3xl font-bold text-blue-dark">Materi Belajar</h1>
        <h3 className="text-xl">Kelas 10</h3>
        <div className="mt-2">
          <select
            id="bab"
            name="bab"
            className="block max-w-[420px] w-full rounded-md border-2 p-1.5 text-gray-900 border-blue-dark mx-auto"
          >
            <option>Pengenalan Konstruksi</option>
          </select>
        </div>
      </div>
      <div>
        <CardHorizontal />
        <CardHorizontal />
        <CardHorizontal />
        <CardHorizontal />
      </div>
    </div>
  );
}
