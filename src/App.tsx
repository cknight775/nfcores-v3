import { Button } from '@/components/ui/Button';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🆘 NFCores
          </h1>
          <p className="text-xl text-gray-600">
            Plataforma de Información Médica de Emergencia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card text-center">
            <h3 className="text-lg font-semibold mb-2">React 18</h3>
            <p className="text-sm text-gray-600">Concurrent rendering</p>
          </div>
          <div className="card text-center">
            <h3 className="text-lg font-semibold mb-2">TypeScript</h3>
            <p className="text-sm text-gray-600">Type safety</p>
          </div>
          <div className="card text-center">
            <h3 className="text-lg font-semibold mb-2">Tailwind CSS</h3>
            <p className="text-sm text-gray-600">Utility-first</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="primary" size="md">
            Botón Principal
          </Button>
          <Button variant="secondary" size="md">
            Botón Secundario
          </Button>
          <Button variant="outline" size="md">
            Botón Outline
          </Button>
          <Button variant="danger" size="md">
            Botón Peligro
          </Button>
        </div>

        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-center text-green-800 font-semibold">
            ✅ Proyecto NFCores inicializado correctamente
          </p>
          <p className="text-center text-sm text-green-600 mt-2">
            Stack: React 18 + TypeScript + Vite + Firebase + Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
