<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Favoritos;

use Illuminate\Support\Facades\DB;

class ClienteController extends Controller
{
    public function makeFavoritos(Request $request)
    {

        $checkFavorito = Favoritos::where('id_cliente', $request->id_cliente)
            ->where('id_propiedad', '=', $request->id_propiedad)
            ->get();

        $valorPropiedad = 0;
        $valorCliente = 0;

        foreach ($checkFavorito as $chkF) {
            $valorPropiedad = $chkF['id_propiedad'];
            $valorCliente = $chkF['id_cliente'];
        }

        if (($valorCliente == $request->id_cliente) && ($valorPropiedad == $request->id_propiedad)) {
            return response()->json(['message' => 'Ya has agregado a favorito este inmueble, agrega otro por favor']);
        } else {
            $favoritos = new Favoritos();

            $favoritos->id_cliente = $request->id_cliente;
            $favoritos->id_propiedad = $request->id_propiedad;

            $favoritos->save();

            return response()->json(['message' => 'Inmueble agregado a favorito de manera exitosa', 'favorito' => $favoritos]);
        }
    }

    public function cuentaFavoritos(Request $request)
    {
        $cuenta = Favoritos::select(DB::raw('count(id_propiedad) as nro_inmuebles'))
        ->where('id_cliente', '=', $request->id_cliente)
        ->get();

        return response()->json($cuenta);
    }

    public function propiedadesFavoritos(Request $request) {
        $propiedades = Favoritos::select('id_propiedad')
        ->where('id_cliente', '=', $request->id_cliente)
        ->get();

        return response()->json($propiedades);
    }
}
